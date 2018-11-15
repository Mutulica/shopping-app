export namespace ProductInterface {

  export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    img: string;
    variants?: string[];
    qty?: number;
  }
}
