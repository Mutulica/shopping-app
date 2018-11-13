import { Component, OnInit } from '@angular/core';
import { CartService } from '../home/cart/cart.service';

import { Item } from '../entities/item.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public shoppingCartItems$: Observable<Item[]>;

  constructor(public cartService: CartService) {

    this.shoppingCartItems$ = this.cartService.getItems();

    this.shoppingCartItems$.subscribe(_ => _);

    console.log(this.shoppingCartItems$);
  }

  ngOnInit() {
  }

}
