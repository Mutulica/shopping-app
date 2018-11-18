import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from '../product/product.interface';

import { CartService } from '../cart/cart.service';
import { CollectionService } from './collection.service';
import { UtilsService } from '../../utils/utils.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  public status = { loaded: false, saving: false };
  public message: string;
  public productData: ProductInterface.Product[];
  public p = 1;
  order = '';
  reverse = false;

  constructor(
    private collectionService: CollectionService,
    private cartService: CartService,
    private router: Router,
    public utilsService: UtilsService
  ) {
    this.status.loaded = false;

    this.collectionService.getAll().subscribe(res => {
        this.productData = res;
        this.status.loaded = true;
    });

  }

  ngOnInit() {

  }

  // Add to cart
  public addToCart(item: ProductInterface.Product): void {
    item.qty = 1;
    if (item.qty > 0) {
      this.cartService.addToCart(item, item.qty);
      this.message = 'Product added to cart';
      this.utilsService.toggleNotification();
    }
  }
  // View Product
  public async viewProduct(id: string) {
    await this.router.navigate([`/home/product/${id}`]);
  }


  // OrderBy Products
  public onSetOrder(value) {
    this.setOrder(value);
  }

  public setOrder(value: string) {
    if (value === 'title-az') {
      this.order = 'title';
      this.reverse = false;
    }
    if ( value === 'title-za') {
      this.order = 'title';
      this.reverse = true;
    }
    if ( value === 'price-highest') {
      this.order = 'price';
      this.reverse = true;
    }
    if ( value === 'price-lowest') {
      this.order = 'price';
      this.reverse = false;
    }
  }
}
