import { Component, OnInit } from '@angular/core';
import { CartService } from '../home/cart/cart.service';

import { Item } from '../entities/item.model';
import { CartInterface } from '../home/cart/cart.interface';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public shoppingCartItems$: Observable<CartInterface.Item[]>;
  public totalItems: number;

  constructor(public cartService: CartService) {

    // this.shoppingCartItems$ = this.cartService.getItems().subscribe(_ => {
    //
    //   console.log('**********', _);
    //   return _;
    // });
    //
    // console.log(this.shoppingCartItems$);

    this.shoppingCartItems$ = this
      .cartService
      .getItems();

    this.shoppingCartItems$.subscribe(_ => this.totalItems =  _.length);
    console.log(this.totalItems);
  }

  ngOnInit() {
  }

}
