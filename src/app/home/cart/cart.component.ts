import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../entities/product.model';
import { Item } from '../../entities/item.model';

import { CartService } from './cart.service';

import {BehaviorSubject, Observable, Subject, Subscriber, of} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {
  // public cartProducts: Item[] = [];
  // public totalItems = 0;
  public totalPrice = 0;

  public shoppingCartItems$: Observable<Item[]> = of([]);
  public shoppingCartItems: Item[] = [];


  constructor(
     private cartService: CartService,
     private activatedRoute: ActivatedRoute
  ) {

    this.shoppingCartItems$ = this.cartService.getItems();

    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
    this.cartService.getTotalAmount().subscribe((res) => {
      this.totalPrice = res;
    });
  }

   ngOnInit() {
    //this.cartService.loadCart();
   }

   removeFromCart(item: Item) {
    this.cartService.removeFromCart(item);
   }


  incrementQty(item: Item, qty: number) {
    qty++;
    this.cartService.updateCart(item, qty);
  }

  substractQty(item: Item, qty: number) {
    // let newValue = +input.value;
    if (qty > 1) {
      qty--;
      this.cartService.updateCart(item, qty);
    }
  }
}
