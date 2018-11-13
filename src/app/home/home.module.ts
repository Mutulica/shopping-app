import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { CollectionComponent } from './collection/collection.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { ProductService } from './product/product.service';
import { CartService } from './cart/cart.service';
import { CollectionService } from './collection/collection.service';

import { HomeHttpService } from './home-http.service';

import { HomeRouting } from './home.routing';



@NgModule({
  declarations: [
    CollectionComponent,
    CartComponent,
    ProductComponent,
    CheckoutComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRouting
  ],
  providers: [
    ProductService,
    CartService,
    CollectionService,
    HomeHttpService
  ],
})
export class HomeModule { }
