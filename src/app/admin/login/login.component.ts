import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {

  }

  public message: string;

  ngOnInit() {

  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithEmailAndPass(form) {
    this.authService.loginWithEmail(form.value.email, form.value.password).then(
      res => {
        this.router.navigate(['/admin/dashboard']);
      }
    ).catch(err => {
      this.message = 'Wrong email or password';
    });
  }

}
