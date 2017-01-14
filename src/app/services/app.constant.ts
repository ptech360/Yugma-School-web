import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class Configuration {

  constructor() {

  }

  private url: string = "https://yugmasrgstesting.appspot.com";

  getUrl() {
    return this.url;
  }



}
