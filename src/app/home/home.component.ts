import { Component, OnInit } from '@angular/core';
import { CartInterface } from './cart/cart.interface';

import { ProductService } from './product/product.service';
import { CartService } from './cart/cart.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public cart = [];

  public shoppingCartItems$: Observable<CartInterface.Item[]>;


  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.shoppingCartItems$ = this
      .cartService
      .getItems();

    this.shoppingCartItems$.subscribe(_ => _);
    console.log(this.shoppingCartItems$);
  }

  ngOnInit() {}


}
