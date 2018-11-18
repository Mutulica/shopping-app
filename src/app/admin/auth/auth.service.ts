import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public userId = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
  ) {
    this.userId = this.afAuth.auth.currentUser;
  }

  // Login with email
  loginWithEmail (email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      if (res) {
        this.userId = res.user.uid;
        this.router.navigate(['/admin/dashboard']);
      }
    });
  }

  // Login with Google
  loginWithGoogle () {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        if (res.credential.providerId) {
          this.userId = res.user.uid;
          this.router.navigate(['/admin/dashboard']);
        }
      });
  }

  // Logout
  logout () {
    this.afAuth.auth.signOut().then(
      res => {
        this.router.navigate(['/admin/login']);
      }
    );
  }

  // Autenticated
  get autenticated() {
    return this.afAuth.authState;
  }

  async isLoggedIn() {
    return await this.afAuth.authState.pipe(first());
  }

  getUID(): string {
    let uid = '';
    this.afAuth.authState.subscribe(res => {
      if (res.uid) {
        uid = res.uid;
      }
    });
    return uid;
  }
}
