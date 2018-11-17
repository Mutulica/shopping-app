import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';

import {HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

import { CustomValidators } from './utils/validators.service';
import { CartService } from './home/cart/cart.service';
import { CollectionService } from './home/collection/collection.service';
import { ProductService } from './home/product/product.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { AppRouting } from './app.routing';




@NgModule({
  declarations: [
    AppComponent,
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
    ProductService,
    AngularFireAuth,
    CustomValidators
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
