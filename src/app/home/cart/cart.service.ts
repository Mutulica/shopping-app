import { Injectable } from '@angular/core';

import {CartInterface} from './cart.interface';
import { ProductInterface } from '../product/product.interface';

import {BehaviorSubject, Observable, Subject, Subscriber, of} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()

export class CartService {

  private itemsInCartSubject: BehaviorSubject<CartInterface.Item[]> = new BehaviorSubject([]);
  // Cart Products array
  public cartProducts: CartInterface.Item[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.cartProducts = _);
  }

  // Add to cart
  public addToCart(product: ProductInterface.Product, qty: number) {

    const itemIndex: number = this.getSelectedIndex(product.id);
    if (itemIndex < 0) {
      const addItem: CartInterface.Item = {product: product, quantity: qty};
      this.cartProducts.push(addItem);
    } else {
      this.cartProducts[itemIndex].quantity += qty;
    }
    this.itemsInCartSubject.next([...this.cartProducts]);
  }

  // Get Cart Items
  public getItems(): Observable<CartInterface.Item[]> {
    return this.itemsInCartSubject;
  }

  // Get Total amount
  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.pipe(
      map((items: CartInterface.Item[]) => {
        return items.reduce((prev, curr: CartInterface.Item) => {
          const n =  prev + (curr.product.price * curr.quantity);
          const total =  n.toFixed(2);
          return +total;
        }, 0);
      })
    );
  }

  // Remove from cart
  public removeFromCart(item: CartInterface.Item) {
    const currentItems = [...this.cartProducts];
    const itemsWithoutRemoved = currentItems.filter(_ => _.product.id !== item.product.id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  // Update Cart
  updateCart(item: CartInterface.Item, qty) {
    this.cartProducts.filter(_ => {
      if (_.product.id === item.product.id) {
        _.quantity = qty;
        return this.cartProducts;
      }
    });
    this.itemsInCartSubject.next(this.cartProducts);
  }

  // Clear Cart
  public clearCart() {
    this.cartProducts = [];
    this.itemsInCartSubject.next([...this.cartProducts]);
  }

  // Find Index
  private getSelectedIndex(id: string): number {
    for (let i = 0; i < this.cartProducts.length; i++) {
      if (this.cartProducts[i].product.id === id) {
        return i;
      }
    }
    return -1;
  }
}
