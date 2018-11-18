import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

import { HomeComponent } from './home.component';
import { CollectionComponent } from './collection/collection.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { ProductService } from './product/product.service';
import { CartService } from './cart/cart.service';
import { CollectionService } from './collection/collection.service';
import { AuthService } from '../admin/auth/auth.service';
import { CheckoutGuard } from './checkout/checkout.guard';

import { HomeHttpService } from './home-http.service';

import { HomeRouting } from './home.routing';





@NgModule({
  declarations: [
    CollectionComponent,
    CartComponent,
    ProductComponent,
    CheckoutComponent,
    HomeComponent,
    HeaderComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRouting,
    NgxPaginationModule,
    OrderModule
  ],
  providers: [
    ProductService,
    CartService,
    CollectionService,
    HomeHttpService,
    AuthService,
    CheckoutGuard
  ],
})
export class HomeModule { }
