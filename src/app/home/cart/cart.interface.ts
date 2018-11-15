import {ProductInterface} from '../product/product.interface';

export namespace CartInterface {

  export class Item {

    product: ProductInterface.Product;
    quantity: number;
    variant?: string;

  }
}
