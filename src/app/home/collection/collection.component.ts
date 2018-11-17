import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from '../product/product.interface';

import { CartService } from '../cart/cart.service';
import {CollectionService} from './collection.service';
import {HomeHttpService} from '../home-http.service';

import {FormBuilder} from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  private filterAsc = false;
  public productData: ProductInterface.Product[];
  public p = 1;
  order = '';
  reverse = false;

  constructor(
    private collectionService: CollectionService,
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router,
    private orderPipe: OrderPipe,
    private homeHttp: HomeHttpService
  ) {

    this.collectionService.getAll().subscribe(res => this.productData = res);

  }

  ngOnInit() {

  }

  // Add to cart
  public addToCart(item: ProductInterface.Product): void {
    item.qty = 1;
    if (item.qty > 0) {
      this.cartService.addToCart(item, item.qty);
    }
  }
  // View Product
  public async viewProduct(id: string) {
    await this.router.navigate([`/home/product/${id}`]);
  }


  filterProducts(field) {
    this.filterAsc = !this.filterAsc;
    this.collectionService.sortProducts(field.srcElement.value, this.filterAsc);
  }

  // OrderBy Products
  public onSetOrder(value) {
    this.setOrder(value);
  }

  public setOrder(value: string) {
    if (value === 'title-az') {
      this.order = 'title';
      this.reverse = false;
    }
    if ( value === 'title-za') {
      this.order = 'title';
      this.reverse = true;
    }
    if ( value === 'price-highest') {
      this.order = 'price';
      this.reverse = true;
    }
    if ( value === 'price-lowest') {
      this.order = 'price';
      this.reverse = false;
    }
  }
}
