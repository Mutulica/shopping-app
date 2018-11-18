import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ProductInterface } from './product.interface';
import { ProductService } from './product.service';

import {CartService} from '../cart/cart.service';
import {CollectionService} from '../collection/collection.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public params;
  public product;
  public prodForm: FormGroup;

  constructor(
    private collectionService: CollectionService,
    private cartService: CartService,
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.params = this.route.snapshot.params;
  }

  ngOnInit() {
    this.getProduct();
  }

  public async getProduct(id?: string) {
    this.product = await this.productService.findByID(this.params.id);
    this.createForm();
  }

  createForm() {
    this.prodForm = this.fb.group({
      id: new FormControl(this.product.id),
      title: new FormControl(this.product.title),
      description: new FormControl(this.product.description),
      price: new FormControl(this.product.price),
      img: new FormControl(this.product.img),
      qty: new FormControl(1),
    });
  }

  public addToCart(item: ProductInterface.Product): void {
    if (item.qty > 0) {
      this.cartService.addToCart(item, +item.qty);
    }
  }

  incrementQty() {
    this.prodForm.value['qty']++;
  }

  substractQty() {
    if (this.prodForm.value['qty'] > 1) {
        this.prodForm.value['qty']--;
    }
  }

}
