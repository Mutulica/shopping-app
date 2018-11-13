import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './home/cart/cart.component';
import { CollectionComponent } from './home/collection/collection.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule'},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting { }
