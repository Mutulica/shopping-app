import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from '../product/product.interface';

import { CartService } from '../cart/cart.service';

import {FormBuilder, FormArray, FormGroup, FormControl} from '@angular/forms';

import {CollectionService} from './collection.service';
import {HomeHttpService} from '../home-http.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  private filterAsc = false;
  public productData: ProductInterface.Product[];

  prodForm: FormGroup;

  constructor(
    private collectionService: CollectionService,
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router,
    private homeHttp: HomeHttpService
  ) {

    this.collectionService.getAll().subscribe(res => this.productData = res);

  }

  ngOnInit() {

  }

  public addToCart(item: ProductInterface.Product): void {
    item.qty = 1;
    if (item.qty > 0) {
      this.cartService.addToCart(item, item.qty);
    }
  }

  public async viewProduct(id: string) {
    await this.router.navigate([`/home/product/${id}`]);
  }


  filterProducts(field) {
    this.filterAsc = !this.filterAsc;
    this.collectionService.sortProducts(field.srcElement.value, this.filterAsc);
  }
}
