import { Component, OnInit } from '@angular/core';

import { AdminHttpService } from '../admin-http.service';

import { ProductInterface } from '../../home/product/product.interface';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {ProductService} from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public prodForm: FormGroup;

  public productData: ProductInterface.Product[] = [];
  public product: ProductInterface.Product;
  public ordersData = [];

  constructor(
    private adminHttp: AdminHttpService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {

    this.prodForm = this.fb.group({
      title: new FormControl(''),
      price: new FormControl(''),
      description: new FormControl(''),
      img: new FormControl(''),
      }

    )
    this.adminHttp.httpGetItems().subscribe(
      (res: ProductInterface.Product[]) => {
        this.productData = res;
      });

    this.adminHttp.httpGetOrders().subscribe(
      res => {
      this.ordersData = res;
    });
  }

  ngOnInit() {}

  public async addProduct(form: NgForm) {
     await this.adminHttp.productAdd(this.prodForm.value);
  }

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
  saveChanges(form) {

  }

  public editProduct(product) {
    this.product = null;
    const index = this.productData.indexOf(product);
    this.product = this.productData[index];
    // if (index > -1) {
    //   this.prodForm.patchValue(this.productData[index]);
    // }
  }

  public async deleteProduct(id) {
    await this.adminHttp.productDelete(id);
  }

  public onFileUpload(event) {

  }
}
