import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Configuration } from './app.constant';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminService {

  private baseUrl: string = "";

  constructor(private http: Http,
              private config: Configuration) {
    this.baseUrl = this.config.getUrl();
    console.log("constructor");
  }

  getSubjects(){
    // new AdminService(this.http,this.config);
    let options = this.config.getHeaderWithWeb();
    return this.http.get("https://yugma-ut.appspot-preview.com" + "/subject", options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }  

  getStandards(){
    let options = this.config.getHeaderWithWeb();
    return this.http.get("https://yugma-ut.appspot-preview.com" + "/standard", options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  addEmployee(data){
    console.log(data);
    let options = this.config.getHeaderWithWeb();
    return this.http.post("https://yugma-ut.appspot-preview.com/admin/employee",data, options).toPromise()
    .then((response) =>{
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
}