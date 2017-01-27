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

  getComplaintById(id){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl + "/complaint/" + id, options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaints(pageNo) {
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl + "/complaint/page/" + pageNo, options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  public getComplaintByStatusId(statusId,pageNo) {
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl+"/complaint/status/" + statusId+"/page/"+pageNo,options).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaintByCategoryAndStatusId(categoryId,statusId,pageNo){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl+ "/complaint/category-status/" + categoryId + "/" + statusId+"/page/"+pageNo,options).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaintByCategoryId(categoryId,pageNo){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl+"/complaint/category-status/category/" + categoryId+"/page/"+pageNo,options).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaintByDepartmentAndStatusId(departmentId,statusId,pageNo){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl+ "/complaint/department-status/" + departmentId + "/" + statusId+"/page/"+pageNo,options).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaintByDepartmentId(departmentId,pageNo){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl+"/complaint/department-status/department/" + departmentId+"/page/"+pageNo,options).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaintOfProgramByProgramAndStandardId(programId,standardId,pageNo){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl+"/complaint/program-standard/" + programId +"/" + standardId+"/page/"+pageNo,options).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaintByStandardId(standardId){
    
  }

  getComplaintOfProgramByProgramId(programId,pageNo){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.baseUrl+"/complaint/program-standard/program/" + programId+"/page/"+pageNo,options).toPromise()
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
