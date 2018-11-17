import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private autenticated = null;

  constructor(
    private router: Router,
    private fsAuth: AngularFireAuth,
    private authService: AuthService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.fsAuth.authState.pipe(
      map((auth) =>  {
        if (auth == null) {
          this.router.navigate(['/admin/login']);
          return false;
        } else {
          return true;
        }
      })
    );

  }
}
