import { Injectable } from '@angular/core';

import { ProductInterface } from '../product/product.interface';

import {BehaviorSubject, Observable} from 'rxjs';
import {HomeHttpService} from '../home-http.service';





@Injectable()

export class CollectionService {

  private productsSubject: BehaviorSubject<ProductInterface.Product[]> = new BehaviorSubject([]);
  public dataProducts: ProductInterface.Product[] = [];

  constructor(
    private homeHttp: HomeHttpService
  ) {
    this.homeHttp.getAll().subscribe((res) => {
       this.dataProducts = res;
      this.productsSubject.next([...res]);
    });
  }

  getAll(): Observable<ProductInterface.Product[]> {
    return this.productsSubject;
  }

  public findByID(id: string): ProductInterface.Product {
    const singleProduct = this.dataProducts.filter(_ => _.id === id);
    console.log(singleProduct);
    if (singleProduct.length > 0) {
      return singleProduct[0];
    }
  }

  public filterAZ(products): Observable<ProductInterface.Product[]> {
    return products.reduce((a,  b) => {
      return a.price > b.price ? a : b;
    });
  }

  sortProducts(option: string, mode: boolean) {
    if (option === 'price') {
      if ( mode ) {
        console.log(this.dataProducts);
        this.dataProducts.sort((a, b) => {
          return a[option] - b[option];
        });
      } else {
        console.log(this.dataProducts);
        this.dataProducts.sort((b, a) => {
          return a[option] - b[option];
        });
      }
    } else {
      this.dataProducts.sort((a, b) => {
        if (a[option] > b[option]) {
          return 1;
        } else if (a[option] < b[option]) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }


}
