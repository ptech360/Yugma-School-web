import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Configuration } from './app.constant';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ComplaintService {

  private url: string = "";
  private loggedIn = false;
  private headers;

  constructor(private http: Http,
              private config: Configuration) {
    this.url = this.config.getUrl();
  }

  getComplaints() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });


    var options = new RequestOptions({
      headers: this.headers
    });
    return this.http.get(this.url + "/complaint", options)
    .toPromise()
    .then(response => {
      return Promise.resolve(response);
    }).catch(err => { return Promise.reject(err); });
  }

}
