import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormArray, FormGroup, FormControl} from '@angular/forms';

import {ProductService} from './product.service';

import {Product} from '../../entities/product.model';
import {CartService} from '../cart/cart.service';
import {CollectionService} from '../collection/collection.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public params;
  public product: Product;
  public prodForm: FormGroup;
  constructor(
    private collectionService: CollectionService,
    private cartService: CartService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.params = this.route.snapshot.params;
  }

  ngOnInit() {
    const id = +this.params.id;
    this.product = this.collectionService.findByID(id);
    this.prodForm = this.fb.group({
      id: new FormControl(this.product.id),
      title: new FormControl(this.product.title),
      description: new FormControl(this.product.description),
      price: new FormControl(this.product.price),
      img: new FormControl(this.product.img),
      qty: new FormControl(1)
    });

    console.log(this.prodForm);
  }


  public addToCart(item: Product): void {
    if (item.qty > 0) {
      this.cartService.addToCart(item, item.qty);
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
