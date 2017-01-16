import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Configuration } from './app.constant';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ComplaintService {

  private url: string = "";
  private loggedIn = false;
  private headers;
  private role: string;
  private userId: string;
  private complaintUrl: string;

  constructor(private http: Http,
              private config: Configuration) {
    this.buildUrl();
  }

  buildUrl() {
    this.url = this.config.getUrl();
    this.role = this.config.getRole();
    this.userId = this.config.getUserId();
    this.complaintUrl = this.url + "/" + this.role + "/" + this.userId + "/complaint/page/";
  }

  getComplaints(pageNo) {
    let options = this.config.getHeader();
    return this.http.get(this.complaintUrl + pageNo, options)
    .toPromise()
    .then(response => {
      return Promise.resolve(response);
    }).catch(err => { return Promise.reject(err); });
  }

}
