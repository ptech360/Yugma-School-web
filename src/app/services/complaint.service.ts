import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Configuration } from './app.constant';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ComplaintService {

  private baseUrl: string = "";
  private loggedIn = false;
  private headers;
  private role: string;
  private userId: string;
  private complaintUrl: string;

  constructor(private http: Http,
              private config: Configuration) {
    this.baseUrl = this.config.getUrl();
  }

  getComplaints(pageNo) {
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl + "/complaint/page/" + pageNo, options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  editInfo() {
    let options = this.config.getHeaderWithoutWeb();
    return this.http.get(this.baseUrl + "/complaint/edit-info", options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

}
