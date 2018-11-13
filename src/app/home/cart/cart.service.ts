import { Injectable } from '@angular/core';
import { Item } from '../../entities/item.model';
import { Product } from '../../entities/product.model';

import {BehaviorSubject, Observable, Subject, Subscriber, of} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()

export class CartService {
  private itemsInCartSubject: BehaviorSubject<Item[]> = new BehaviorSubject([]);

  public cartProducts: Item[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.cartProducts = _);
  }

  public addToCart(product: Product, qty) {

    const itemIndex: number = this.getSelectedIndex(+product.id);
    if (itemIndex < 0) {
      const addItem: Item = {product: product, quantity: qty};
      this.cartProducts.push(addItem);
    } else {
      this.cartProducts[itemIndex].quantity += qty;
    }
    this.itemsInCartSubject.next([...this.cartProducts]);
    console.log(this.cartProducts);
  }

  public getItems(): Observable<Item[]> {
    return this.itemsInCartSubject;
  }

  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.pipe(
      map((items: Item[]) => {
        return items.reduce((prev, curr: Item) => {
          return prev + (curr.product.price * curr.quantity);
        }, 0);
      })
    );
  }

  public removeFromCart(item: Item) {
    const currentItems = [...this.cartProducts];
    const itemsWithoutRemoved = currentItems.filter(_ => _.product.id !== item.product.id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  updateCart(item: Item, qty) {
    this.cartProducts.filter(_ => {
      if (_.product.id === item.product.id) {
        _.quantity = qty;
        return this.cartProducts;
      }
    });
    console.log(this.cartProducts);
    this.itemsInCartSubject.next(this.cartProducts);
  }

  private getSelectedIndex(id: number): number {
    for (let i = 0; i < this.cartProducts.length; i++) {
      if (this.cartProducts[i].product.id === id) {
        return i;
      }
    }
    return -1;
  }
}
