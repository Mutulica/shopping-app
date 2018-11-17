import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';

const adminRoutes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
      { path: 'login', component: LoginComponent },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})

export class AdminRouting {}
