import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';

import { ProductService } from './products/product.service';
import { AdminHttpService } from './admin-http.service';

import { AdminRouting } from './admin.routing';





@NgModule({
  declarations: [
    AdminComponent,
    ProductsComponent,
    OrdersComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRouting
  ],
  providers: [
    AdminHttpService,
    ProductService,
  ],
})
export class AdminModule { }
