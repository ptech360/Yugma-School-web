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
  }

  login(data) {
    let options = this.config.getHeaderForLogin();
    return this.http.post(this.url+"/oauth/token?grant_type=password&username="+data.username+"&password="+data.password, {}, options)
    .toPromise()
    .then(response => {
      localStorage.setItem('access_token', response.json().access_token);
      return Promise.resolve(response);
    }).catch(err => { return Promise.reject(err); });
  }

  getManagementInfo() {
    let options = this.config.getHeaderWithoutWeb();
    return this.http.get(this.url + "/management/info", options)
    .toPromise()
    .then((res) => {
      return Promise.resolve(res);
    }).catch(err => { return Promise.reject(err); });
  }

  storeManagementData(management) {
    console.log(management);
    localStorage.setItem("id", management.id);
    localStorage.setItem("name", management.name);
    localStorage.setItem("email", management.email);
    localStorage.setItem("contactNo", management.contactNo);
    localStorage.setItem("classTeacher", management.classTeacher);
    localStorage.setItem("username", management.username);
    localStorage.setItem("nickName", management.nickName);
    localStorage.setItem('role', management.role);
    localStorage.setItem('picUrl', management.fileUrl+"/"+management.picTimestamp);
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
    return this.http.put(this.url + "/management/" + userId +"/password", data, options)
    .toPromise()
    .then((res) => {
      return Promise.resolve(res);
    }).catch(err => { return Promise.reject(err); });
  }

  uploadProfilePic(newfile){
    let options = this.config.getHeaderForFile();
    let userId = this.config.getUserId();
    let formData = new FormData();      
    formData.append('file',newfile);
    return this.http.post(this.url + "/management/" + userId +"/picture",formData,options).toPromise().then( res =>{
          return Promise.resolve(res);
        });
  }
  uploadEmployeePic(id,newfile){
    let options = this.config.getHeaderForFile();
    let userId = this.config.getUserId();
    let formData = new FormData();      
    formData.append('file',newfile);
    return this.http.post("https://yugma-ut.appspot-preview.com" + "/management/" + id + "/picture",formData,options).toPromise().then( res =>{
          return Promise.resolve(res);
        });
  }

}
