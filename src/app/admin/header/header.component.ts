import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  public autenticated = null;

  constructor(
    private authService: AuthService,
  ) {

    this.authService.autenticated.subscribe(
      res => {
        this.autenticated = res;
      }
    );
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }

}
