import { CartInterface } from '../home/cart/cart.interface';


export namespace OrderInterface {

  export interface ContactDetails {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
  }

  export interface Order {
    id?: string;
    details: ContactDetails;
    products: CartInterface.Item[];
    order_date: number;
    total: number;
  }
}
