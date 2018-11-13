import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Product} from '../../entities/product.model';

import { CartService } from '../cart/cart.service';

import {FormBuilder, FormArray, FormGroup, FormControl} from '@angular/forms';

import {CollectionService} from './collection.service';
import {HomeHttpService} from '../home-http.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  private filterAsc = false;
  public productData: Product[];

  prodForm: FormGroup;

  constructor(
    private collectionService: CollectionService,
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router,
    private homeHttp: HomeHttpService
  ) {
    this.productData = this.collectionService.getAll();
  }

  ngOnInit() {

  }

  public addToCart(item: Product): void {
    item.qty = 1;
    if (item.qty > 0) {
      this.cartService.addToCart(item, item.qty);
    }
  }

  public async viewProduct(id: number) {
    await this.router.navigate([`/home/product/${id}`]);
  }

  public incrementQty(product: Product, index: number) {
    // qty.value++;
    // product.qty = +qty.value;
    // console.log(product.qty, typeof qty.value);
    product.qty++;
    this.prodForm.controls['products']['controls'][index].controls.qty.setValue(product.qty);
  }

  public substractQty(product: Product, index: number) {
    console.log(product.qty);
    if (product.qty > 1) {
      // qty.value--;
      // product.qty = qty.value;
      product.qty--;
      this.prodForm.controls['products']['controls'][index].controls.qty.setValue(product.qty);
    }
  }

  filterProducts(field) {
    this.filterAsc = !this.filterAsc;
    this.collectionService.sortProducts(field.srcElement.value, this.filterAsc);
  }
}
