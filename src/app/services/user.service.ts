import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Configuration } from './app.constant';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {

  private url: string = "";
  private loggedIn = false;
  private headers;

  constructor(private http: Http,
              private config: Configuration) {
    this.url = this.config.getUrl();
    this.loggedIn = !!localStorage.getItem('access_token');
    console.log("DASd", this.url)
  }

  login(data) {
    return this.http.post(this.url + "/login", data)
    .toPromise()
    .then(response => {
      localStorage.setItem('access_token', response.json().access_token);
      this.loggedIn = true;
      return Promise.resolve(response);
    }).catch(err => { return Promise.reject(err); });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
