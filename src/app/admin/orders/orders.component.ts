import { Component, OnInit } from '@angular/core';
import { AdminHttpService } from '../admin-http.service';
import { OrderInterface } from '../../shared/order.interface';

import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public status = { loaded: false, saving: false };
  public ordersData: OrderInterface.Order[] = [];
  public order: OrderInterface.Order;

  public sortedOrders:  OrderInterface.Order[];

  public p = 1;
  public sort = 'order_date';
  reverse = true;

  constructor(
    private adminHttp: AdminHttpService,
    private orderPipe: OrderPipe,
  ) {

    this.status.loaded = false;
    this.adminHttp.httpGetOrders().subscribe(
      res => {
        this.ordersData = res;
        console.log(this.ordersData)
        this.status.loaded = true;
        this.sortedOrders = orderPipe.transform(this.ordersData, 'order_date');
      });
  }

  ngOnInit() {
  }

  public getOrder(id: string): void {
    this.adminHttp.getOrderById(id).then(
      res => {
        this.order = res;
      }
    );
  }

  public deleteOrder(id: string): void {
    this.adminHttp.orderDelete(id).then(
      res => {
        if (res) {
          console.log(res);
        }
      }
    );
  }

  // OrderBy
  public setOrder(value: string): void {
    if (this.sort === value) {
      this.reverse = !this.reverse;
    }
    this.sort = value;
  }

}
