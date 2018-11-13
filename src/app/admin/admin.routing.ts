import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import {LoginComponent} from './login/login.component';

const adminRoutes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'orders', component: OrdersComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})

export class AdminRouting {}
