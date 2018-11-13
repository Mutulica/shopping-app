import { Injectable } from '@angular/core';

import { Product } from '../../entities/product.model';

@Injectable()

export class ProductService {
  private products: Product[];

  constructor() {
  }

  findAll(): Product[] {
    return this.products;
  }



  // private getSelectedIndex(id: number) {
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }
}
