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
}
