import { Injectable } from '@angular/core';

import { ProductInterface } from './product.interface';
import {CollectionService} from '../collection/collection.service';
import {HomeHttpService} from '../home-http.service';

@Injectable()

export class ProductService {

  public dataProducts: ProductInterface.Product[];

  constructor(
    private collectionService: CollectionService,
    private homeHttp: HomeHttpService
  ) {
    this.collectionService.getAll().subscribe(res => this.dataProducts = res);
  }

  public findByID(id: string) {
    return this.homeHttp.getById(id);
  }

}
