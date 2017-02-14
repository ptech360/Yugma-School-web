import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';

declare let Materialize;

@Injectable()
export class Configuration {

  private headers;
  private loggedInUser = {
    role: '',
    userId: ''
  }

  constructor() {

  }

  // private url: string = "https://yugmasrgstesting.appspot.com";
  // private url: string = "http://desktop-nj52npk:8080/YUGMASRGSUT";
  private url: string = "https://yugma-ut.appspot-preview.com";

  getHeaderWithWeb() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'isWeb': true,
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      
    });

    var options = new RequestOptions({
      headers: this.headers
    });

    return options;
  }

  getHeaderWithoutWeb() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    var options = new RequestOptions({
      headers: this.headers
    });

    return options;
  }

  getRole() {
    return localStorage.getItem("role");
  }

  getUserId() {
    return localStorage.getItem("id");
  }

  public baseUrl;

  buildUrl() {
    this.loggedInUser.role = this.getRole();
    this.loggedInUser.userId = this.getUserId();
    this.baseUrl = this.url + "/" + this.loggedInUser.role + "/" + this.loggedInUser.userId;
  }

  getUrl() {
    return this.baseUrl;
  }

  showToast(msg) {
    Materialize.toast(msg, 4000);
  }

}
