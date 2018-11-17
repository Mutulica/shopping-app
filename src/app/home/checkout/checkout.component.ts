import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import {Observable} from 'rxjs';
import {FormBuilder, NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import {HomeHttpService} from '../home-http.service';

import { OrderInterface } from '../../shared/order.interface';
import { CartInterface } from '../cart/cart.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public shoppingCartItems$: Observable<CartInterface.Item[]>;
  public cartItems: CartInterface.Item[] = [];
  public cartTotal: number;
  public checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private homeHttp: HomeHttpService,
    private fb: FormBuilder
  ) {
    this.shoppingCartItems$ = this
      .cartService
      .getItems();

    this.shoppingCartItems$.subscribe(_ => this.cartItems =  _);
    this.cartService.getTotalAmount().subscribe(res => this.cartTotal = res );
    // Form
    this.checkoutForm = this.fb.group({
      name : new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      }
    );
  }

  ngOnInit() {
  }

  public placeOrder() {
    const order: OrderInterface.Order = {
      details: this.checkoutForm.value,
      products: this.cartItems,
      order_date:  new Date().getTime(),
      total: this.cartTotal
    };
   this.homeHttp.orderAdd(order);
  }
}
