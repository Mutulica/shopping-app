import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AdminService } from '../admin.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public uid: string;
  public autenticated = null;

  constructor(
    private adminService: AdminService,
    public authService: AuthService,
  ) {

  }

  ngOnInit() {

  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithEmailAndPass(form) {
    this.authService.loginWithEmail(form.value.email, form.value.password);
  }

}
