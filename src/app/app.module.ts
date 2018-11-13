import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';

import {HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';

import { CartService } from './home/cart/cart.service';
import { CollectionService } from './home/collection/collection.service';
import { ProductService } from './home/product/product.service';
import { HomeHttpService } from './home/home-http.service';

import { AppRouting } from './app.routing';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'shopping-cart'),
  ],
  providers: [
    AngularFireDatabase,
    CartService,
    CollectionService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
