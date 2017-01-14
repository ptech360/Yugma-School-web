import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UserService {

  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    console.log("DASd", this.loggedIn)
  }

  login(email, password) {
    localStorage.setItem("auth_token", "loggedIn");
    this.loggedIn = true;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
