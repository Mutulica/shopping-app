import { Component, OnInit } from '@angular/core';

import { CartInterface } from './cart.interface';

import { CartService } from './cart.service';

import { Observable, of} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {
  public totalPrice = 0;

  public shoppingCartItems$: Observable<CartInterface.Item[]> = of([]);
  public shoppingCartItems: CartInterface.Item[] = [];


  constructor(
     private cartService: CartService,
  ) {

    this.shoppingCartItems$ = this.cartService.getItems();

    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
    this.cartService.getTotalAmount().subscribe((res) => {
      this.totalPrice = res;
    });
  }

   ngOnInit() {
   }

   // Remove item form cart
   removeFromCart(item: CartInterface.Item) {
    this.cartService.removeFromCart(item);
   }

  // Increment quantity
  incrementQty(item: CartInterface.Item, qty: number) {
    qty++;
    this.cartService.updateCart(item, qty);
  }

  // Substract quantity
  substractQty(item: CartInterface.Item, qty: number) {
    // let newValue = +input.value;
    if (qty > 1) {
      qty--;
      this.cartService.updateCart(item, qty);
    }
  }
}
