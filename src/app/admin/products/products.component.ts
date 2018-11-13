import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service';
import { AdminHttpService } from '../admin-http.service';

import { ProductInterface } from '../../home/product/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productData: ProductInterface.Product[] = [];
  public ordersData = [];

  constructor(
    private adminHttp: AdminHttpService,
  ) {
    this.adminHttp.getAll().subscribe(
      (res: any) => {
        this.productData = res;
      });

    this.adminHttp.getOrders().subscribe(res => {
      console.log(res);
      this.ordersData = res;
    });
  }

  ngOnInit() {}

  public async addProduct() {
    const product = {
        title: 'G-Shock Gold-Tone Dial Black Resin Men\'s Watch',
        description: 'Black resin case with a black resin strap. Fixed black resin bezel. Black dial with gold-tone hands and index hour markers. Minute markers around the outer rim. Dial Type: Analog-digital. Full auto calendar. Quartz movement. Solid case back. Case dimensions: 57.5 x 53.4 mm. Case thickness: 18.4 mm. Round case shape. Tang clasp. Water resistant at 200 meters / 660 feet. Functions: hour, minute, second, led light with afterglow, world time with 31 time zones, 1/100 second stopwatch, countdown timer, 5 daily alarms (w/1 snooze alarm), hourly time signal, 12/24 hour format. Sport watch style. Casio G-Shock Gold-Tone Dial Black Resin Men\'s Watch GA-710GB-1ACR.',
        price: 120,
        img: './assets/img/product.png',
        id: ''
      };
    await this.adminHttp.productAdd(product);
  }

  public async deleteProduct(id) {
    await this.adminHttp.productDelete(id);
  }
}
