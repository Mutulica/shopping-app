import { ProductInterface } from '../product/product.interface';

export namespace CollectionInterface {

  export interface ProductOptions {
    quantity?: number;
    variant?: string;
  }

  export interface CartItem {
    product: ProductInterface.Product;
    options: ProductOptions;
  }
}
