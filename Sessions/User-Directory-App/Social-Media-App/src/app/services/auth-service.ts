import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  login() {
    this.isLoggedIn = true;
    console.log(this.isLoggedIn);
    
  }
  logout() {
    this.isLoggedIn = false;
  }
  isLoggedInFn() {
    return this.isLoggedIn;
  }
}
