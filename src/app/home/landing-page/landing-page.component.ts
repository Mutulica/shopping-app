import { Component, OnInit } from '@angular/core';
import { HomeHttpService } from '../home-http.service';
import { ProductInterface } from '../product/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public landingProducts: ProductInterface.Product[];
  public status = { loaded: false};

  constructor(
    private homeHttp: HomeHttpService,
    private router: Router
  ) {
    this.status.loaded = false;
    this.homeHttp.getWithLimit(4).subscribe(res => {
      this.landingProducts = res;
      this.status.loaded = true;
    });
  }

  ngOnInit() {
  }

  // View Product
  public async viewProduct(id: string) {
    await this.router.navigate([`/home/product/${id}`]);
  }
}
