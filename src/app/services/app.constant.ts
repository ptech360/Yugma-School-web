import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';

declare let Materialize;

@Injectable()
export class Configuration {

  private headers;

  constructor() {

  }

  private url: string = "https://yugmasrgstesting.appspot.com";
  // private url: string = "http://desktop-nj52npk:8080/YUGMASRGSUT";

  getUrl() {
    return this.url;
  }

  getHeader() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'isWeb': true
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

  showToast(msg) {
    Materialize.toast(msg, 4000);
  }

}
