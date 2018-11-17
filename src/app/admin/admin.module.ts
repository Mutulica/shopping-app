import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { AngularFireAuth } from '@angular/fire/auth';

import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

import { ProductService } from './products/product.service';
import { AdminHttpService } from './admin-http.service';
import { AuthService } from './auth/auth.service';
import { AdminService} from './admin.service';
import { AuthGuard } from './auth/auth.guard';

import { AdminRouting } from './admin.routing';

import { AngularFireStorage} from '@angular/fire/storage';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
  declarations: [
    AdminComponent,
    ProductsComponent,
    OrdersComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRouting,
    NgxPaginationModule,
    OrderModule,
  ],
  providers: [
    AdminHttpService,
    ProductService,
    AngularFireStorage,
    AuthService,
    AngularFireAuth,
    AdminService,
    AuthGuard
  ],
})
export class AdminModule { }
