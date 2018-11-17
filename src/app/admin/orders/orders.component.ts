import { Component, OnInit } from '@angular/core';
import {AdminHttpService} from '../admin-http.service';
import { OrderInterface } from '../../shared/order.interface';
import { ProductInterface } from '../products/product.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public ordersData: OrderInterface.Order[];
  public order: OrderInterface.Order;

  public p = 1;

  constructor(
    private adminHttp: AdminHttpService,
  ) {
    this.adminHttp.httpGetOrders().subscribe(
      res => {
        this.ordersData = res;
      });
  }

  ngOnInit() {
  }

  public getOrder(id: string) {
    this.adminHttp.getOrderById(id).then(
      res => {
        console.log(res);
        this.order = res;
      }
    );
  }

  public deleteOrder(id: string) {
    this.adminHttp.orderDelete(id).then(
      res => {
        if (res) {
          console.log(res);
        }
      }
    );
  }

  public editOrder(order) {

  }

}
