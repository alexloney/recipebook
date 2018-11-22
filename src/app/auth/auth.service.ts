import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { FirebaseAuthState } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: FirebaseAuthState = null;

  constructor(
    private angularFireAuth: AngularFireAuth
  ) {
    this.authState = angularFireAuth.auth;
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState.auth : null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

}
