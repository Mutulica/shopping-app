export namespace ProductInterface {

  export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    img: string;
    variants: string[];
    qty?: number;
  }
}
