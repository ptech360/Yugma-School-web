import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Configuration } from './app.constant';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {
  public urlToTravers = "";
  private url: string = "";
  private loggedIn = false;
  private headers;

  constructor(private http: Http,
              private config: Configuration) {
    this.url = this.config.getUrl();
    this.loggedIn = !!localStorage.getItem('access_token');
  }

  login(data) {
    return this.http.post("https://yugma-ut.appspot-preview.com/login", data)
    .toPromise()
    .then(response => {
      localStorage.setItem('access_token', response.json().access_token);
      return Promise.resolve(response);
    }).catch(err => { return Promise.reject(err); });
  }

  getManagementInfo() {
    let options = this.config.getHeaderWithoutWeb();
    return this.http.get("https://yugma-ut.appspot-preview.com" + "/management/info", options)
    .toPromise()
    .then((res) => {
      return Promise.resolve(res);
    }).catch(err => { return Promise.reject(err); });
  }

  storeManagementData(management) {
    localStorage.setItem("id", management.id);
    localStorage.setItem("name", management.name);
    localStorage.setItem("email", management.email);
    localStorage.setItem("contactNo", management.contactNo);
    localStorage.setItem("classTeacher", management.classTeacher);
    localStorage.setItem("username", management.username);
    localStorage.setItem("nickName", management.nickName);
    localStorage.setItem('role', management.role);
    this.config.buildUrl();
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  forgetPassword(data) {
    return this.http.put(this.url + "/forgot-password", data)
    .toPromise()
    .then((res) => {
      return Promise.resolve(res);
    }).catch(err => { return Promise.reject(err); });
  }

  resetPassword(data) {
    let options = this.config.getHeaderWithoutWeb ();
    let userId = this.config.getUserId();
    return this.http.put(this.url + "/management/" + userId + "/password", data, options)
    .toPromise()
    .then((res) => {
      return Promise.resolve(res);
    }).catch(err => { return Promise.reject(err); });
  }

}
