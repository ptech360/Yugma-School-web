import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Configuration } from './app.constant';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminService {

  private baseUrl: string = "";

  constructor(private http: Http, private config: Configuration) {
    this.baseUrl = this.config.getUrl();
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

  getParents(){
    let options = this.config.getHeaderWithWeb();
    return this.http.get("https://yugma-ut.appspot-preview.com/admin/parent", options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  addEmployee(data){
    let options = this.config.getHeaderWithWeb();
    return this.http.post("https://yugma-ut.appspot-preview.com/admin/employee",data, options).toPromise()
    .then((response) =>{
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  addStudent(data){
    let options = this.config.getHeaderWithWeb();
    return this.http.post("https://yugma-ut.appspot-preview.com/admin/parent",data, options).toPromise()
    .then((response) =>{
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  addStudentWithExistingUser(data){
    let options = this.config.getHeaderWithWeb();
    return this.http.post("https://yugma-ut.appspot-preview.com/admin/students",data, options).toPromise()
    .then((response) =>{
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  getStudentsByParentId(id){
    let options = this.config.getHeaderWithWeb();
    return this.http.get("https://yugma-ut.appspot-preview.com/admin/parent/"+id+"/student", options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  deleteStudent(id){
    let options = this.config.getHeaderWithWeb();
    return this.http.delete("https://yugma-ut.appspot-preview.com/admin/student/"+id, options).toPromise()
    .then((response) =>{
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  updateStudent(id,object){
    let options = this.config.getHeaderWithWeb();
    return this.http.put("https://yugma-ut.appspot-preview.com/admin/student/"+id,object,options).toPromise()
    .then((response) =>{
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  updateParent(id,object){
    let options = this.config.getHeaderWithWeb();
    delete object['id'];
    return this.http.put("https://yugma-ut.appspot-preview.com/admin/parent/"+id,object,options).toPromise()
    .then((response) =>{
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
}