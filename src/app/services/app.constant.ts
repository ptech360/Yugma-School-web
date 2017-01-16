import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';

@Injectable()
export class Configuration {

  private headers;

  constructor() {

  }

  private url: string = "https://yugmasrgstesting.appspot.com";

  getUrl() {
    return this.url;
  }

  getHeader() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    var options = new RequestOptions({
      headers: this.headers
    });

    return options;
  }

  getUserId() {
    return localStorage.getItem("id");
  }



}
