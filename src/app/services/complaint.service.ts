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

    return this.http.get(this.url + "/complaint", this.config.getHeader())
    .toPromise()
    .then(response => {
      return Promise.resolve(response);
    }).catch(err => { return Promise.reject(err); });
  }

}
