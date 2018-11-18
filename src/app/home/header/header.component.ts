import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

import { CartInterface } from '../cart/cart.interface';

import { Observable } from 'rxjs';
import { AuthService } from '../../admin/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public autenticated = {};
  public shoppingCartItems$: Observable<CartInterface.Item[]>;
  public totalItems: CartInterface.Item[];
  public totalPrice: number;

  constructor(
    public cartService: CartService,
    private authService: AuthService,
  ) {

    this.shoppingCartItems$ = this.cartService.getItems();
    this.cartService.getTotalAmount().subscribe(res => {
      this.totalPrice = res;
    });

    this.shoppingCartItems$.subscribe(_ => this.totalItems =  _);


    this.authService.autenticated.subscribe(
      res => {
        this.autenticated = res;
      }
    );
  }

  ngOnInit() {
  }



}
