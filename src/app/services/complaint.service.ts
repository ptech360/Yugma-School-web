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

  getComplaint(url,pageNo){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl + url +"/page/"+pageNo, options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaintById(id){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl + "/complaint/" + id, options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaintCommentById(complaintId){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl+"/complaint/" + complaintId+"/comment",options).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  postComplaintComment(complaintId,comment){
    console.log("1",comment);
    return this.http.post(this.baseUrl+"/complaint/" + complaintId+"/comment",{comment:comment}).toPromise()
    .then((response) =>{
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  updateComplaint(complaintId,complaint){
    return this.http.put(this.baseUrl+"/complaint/" + complaintId, complaint).toPromise()
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
