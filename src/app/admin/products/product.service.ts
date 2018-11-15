import { Injectable } from '@angular/core';
import { ProductInterface } from '../../home/product/product.interface';
import { BehaviorSubject } from 'rxjs';
import {AdminHttpService} from '../admin-http.service';


@Injectable()

export class ProductService {

  public dataProducts: ProductInterface.Product[] = [];

  constructor(
    private adminHttp: AdminHttpService
  ) {

  }



  public async findByID(id: string) {

    return await this.adminHttp.getById(id);
  }

}
