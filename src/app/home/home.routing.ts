import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import { CartComponent } from './cart/cart.component';
import { CollectionComponent } from './collection/collection.component';
import { ProductComponent } from './product/product.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {HomeComponent} from './home.component';
import {CheckoutGuard} from './checkout/checkout.guard';


const homeRoutes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: 'collection', component: CollectionComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard] },
    ] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [RouterModule]
})

export class HomeRouting {}
