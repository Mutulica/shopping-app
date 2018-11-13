import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Item } from '../../entities/item.model';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {HomeHttpService} from '../home-http.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public shoppingCartItems$: Observable<Item[]>;
  public cartItems: Item[] = [];
  public cartTotal: number;

  constructor(
    private cartService: CartService,
    private homeHttp: HomeHttpService
  ) {
    this.shoppingCartItems$ = this
      .cartService
      .getItems();

    this.shoppingCartItems$.subscribe(_ => this.cartItems =  _);
    this.cartService.getTotalAmount().subscribe(res => this.cartTotal = res );
    console.log(this.cartItems);
  }

  ngOnInit() {
  }

  public placeOrder(form: NgForm) {

    const order = {
      details: form.value,
      products: this.cartItems,
      total: this.cartTotal
    };
    this.homeHttp.orderAdd(order);
  }
}
