import { Component, OnInit } from '@angular/core';

import { AdminHttpService } from '../admin-http.service';

import { ProductInterface } from '../../home/product/product.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public status = { loaded: false, saving: false, canClick: false };
  public prodForm: FormGroup;

  public productData: ProductInterface.Product[] = [];
  sortedCollection: ProductInterface.Product[];
  public product: ProductInterface.Product;
  private productImage;
  public p = 1;
  order = 'title';
  reverse = false;

  constructor(
    private adminHttp: AdminHttpService,
    private productService: ProductService,
    private fb: FormBuilder,
    private orderPipe: OrderPipe
  ) {

    this.status.loaded = false;
    this.prodForm = this.fb.group({
      title: new FormControl('', Validators.required),
      id: new FormControl(''),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d{0,8}(\.\d{1,4})?$/)]),
      description: new FormControl('', Validators.required),
      }

    );

    // Get Products
    this.adminHttp.httpGetItems().subscribe(
      (res: ProductInterface.Product[]) => {
        this.productData = res;
        this.status.loaded = true;
      });
    this.sortedCollection = orderPipe.transform(this.productData, 'title');
  }

  ngOnInit() {}

  // Add Product
  public async addProduct() {

    if (this.productImage) {
      // Upload image
      const imgURL = await this.adminHttp.uploadfile(this.productImage);
      this.prodForm.value.img = imgURL;
    }
    // insert product
      this.adminHttp.productAdd(this.prodForm.value).then(
        res => {
          this.productImage = null;
          this.prodForm.reset();
        }
      );
  }

  // Get Product by ID
  public async getProduct(id: string) {

    this.product = null;
    this.productService.findByID(id).then(
      res => {
        if (res) {
          this.product =  res;
        }
      }
    ).catch((err) => console.log(err));
  }

  // Update Product
  public async updateProduct() {

    if (this.productImage) {
      // Update Image
      const imgURL = await this.adminHttp.uploadfile(this.productImage);
      this.prodForm.value.img = imgURL;
    }
    // Update Product
    this.adminHttp.editProduct(this.prodForm.value).then(
      res => {
        this.prodForm.reset();
        this.productImage = null;
      }
    );
  }

  // Edit Product
  public editProduct(product) {
    this.product = null;
    const index = this.productData.indexOf(product);
    this.product = this.productData[index];
    if (index > -1) {
      this.prodForm.patchValue(this.productData[index]);
    }
  }

  // Delete Product
  public async deleteProduct(id) {
    await this.adminHttp.productDelete(id);
  }

  public onFileUpload(event) {
   this.productImage = event.target.files[0];
  }

  onEditProduct() {
    console.log(this.prodForm.value);
  }


  // OrderBy Products
  public setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
