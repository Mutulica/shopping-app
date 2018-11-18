import { Component, OnInit } from '@angular/core';

import { AdminHttpService } from '../admin-http.service';

import { ProductInterface } from '../../home/product/product.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import { OrderPipe } from 'ngx-order-pipe';
import { UtilsService } from '../../utils/utils.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public status = { loaded: false, saving: false };
  public message = '';
  public prodForm: FormGroup;

  public productData: ProductInterface.Product[] = [];
  public sortedCollection: ProductInterface.Product[];
  public selectedProduct: ProductInterface.Product;
  private productImage;
  public p = 1;
  order = 'title';
  reverse = false;

  constructor(
    private adminHttp: AdminHttpService,
    private productService: ProductService,
    private fb: FormBuilder,
    private orderPipe: OrderPipe,
    public utilsService: UtilsService
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
    } else {
      this.prodForm.value.img = '../../assets/img/product.png';
    }
    // insert product
      this.adminHttp.productAdd(this.prodForm.value).then(
        res => {
          this.productImage = null;
          this.prodForm.reset();
          this.message = 'Product added';
          this.utilsService.toggleNotification();
        }
      );
  }

  // Get Product by ID
  public getProduct(id: string) {
    this.selectedProduct = null;
    this.productService.findByID(id).then(
      res => {
        if (res) {
          this.selectedProduct =  res;
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
        this.message = 'Product updated';
        this.utilsService.toggleNotification();
      }
    );
  }

  // Edit Product
  public editProduct(product) {
    this.selectedProduct = null;
    const index = this.productData.indexOf(product);
    this.selectedProduct = this.productData[index];
    if (index > -1) {
      this.prodForm.patchValue(this.productData[index]);
    }
  }

  // Delete Product
  public deleteProduct(id): void {
     this.adminHttp.productDelete(id).then(
       res => {
         this.message = 'Product deleted';
         this.utilsService.toggleNotification();
       }
     );
  }

  public onFileUpload(event) {
   this.productImage = event.target.files[0];
  }

  public onProductAdd() {
    this.prodForm.reset();
    this.productImage = null;
  }

  // OrderBy Products
  public setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}
