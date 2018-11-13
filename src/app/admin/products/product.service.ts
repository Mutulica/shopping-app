import { Injectable } from '@angular/core';
import { ProductInterface } from '../../home/product/product.interface';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class ProductService {

  private dataProductsSubject: BehaviorSubject<ProductInterface.Product[]> = new BehaviorSubject([]);

  public dataProducts: ProductInterface.Product[] = [
    {
      id: 1,
      title: 'You can also invert the colors',
      description: 'some description',
      price: 120,
      variants: ['red', 'blue', 'green'],
      img: './assets/img/product.png'
    },
    {
      id: 2,
      title: 'prod 2',
      description: 'some description',
      price: 120,
      variants: ['red', 'blue', 'green'],
      img: './assets/img/product.png'
    },
    {
      id: 3,
      title: 'prod 3',
      description: 'some description',
      price: 120,
      variants: ['red', 'blue', 'green'],
      img: './assets/img/product.png'
    }
  ];

  constructor() {
    // this.dataProductsSubject.subscribe(_ => this.dataProducts = _ );
  }

  getAll() {
    return this.dataProducts;
  }

  public findByID(id: number): ProductInterface.Product {
    const singleProduct = this.dataProducts.filter(_ => _.id === id);
    if (singleProduct.length > 0) {
      return singleProduct[0];
    }
    // return this.products[this.getSelectedIndex(id)];
  }

}
