import { Injectable } from '@angular/core';

import { Product } from '../../entities/product.model';

import { Observable } from 'rxjs';



@Injectable()

export class CollectionService {

  public dataProducts: Product[] = [
    {
      id: 1,
      title: 'prod 1',
      description: 'some description',
      price: 120,
      variants: ['red', 'blue', 'green'],
      img: './assets/img/product.png'
    },
    {
      id: 2,
      title: 'prod 2',
      description: 'some description',
      price: 100,
      variants: ['red', 'blue', 'green'],
      img: './assets/img/product.png'
    },
    {
      id: 3,
      title: 'prod 3',
      description: 'some description',
      price: 75,
      variants: ['red', 'blue', 'green'],
      img: './assets/img/product.png'
    },
    {
      id: 4,
      title: 'prod 4',
      description: 'some description',
      price: 75,
      variants: ['red', 'blue', 'green'],
      img: './assets/img/product.png'
    },
    {
      id: 5,
      title: 'prod 5',
      description: 'some description',
      price: 75,
      variants: ['red', 'blue', 'green'],
      img: './assets/img/product.png'
    }
  ];

  constructor() {}

  getAll() {
    return this.dataProducts;
  }

  public findByID(id: number): Product {
    const singleProduct = this.dataProducts.filter(_ => _.id === id);
    if (singleProduct.length > 0) {
      return singleProduct[0];
    }
  }

  public filterAZ(products): Observable<Product[]> {
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
