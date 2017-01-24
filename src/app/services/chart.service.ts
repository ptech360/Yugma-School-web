import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';
import { Configuration } from './app.constant';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ChartService {

  private baseUrl: string = "";
  constructor(private http: Http,
    private config: Configuration) {
    this.baseUrl = this.config.getUrl();
  }

  public getComplaintByStatus() {
    return this.http.get(this.baseUrl + "/complaint/status").toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }

  public getComplaintByCategoryAndStatus() {
    return this.http.get(this.baseUrl + "/complaint/category-status").toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }

  public getComplaintOfProgramAndStandard() {
    return this.http.get(this.baseUrl + "/complaint/program-standard").toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }

  public getBelowPerfomanceOfProgram() {
    return this.http.get(this.baseUrl + "/below-performer/program").toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  public getBelowPerfomanceOfProgramById(programId) {
    return this.http.get(this.baseUrl + "/below-performer/program/" + programId).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  public getBelowPerfomanceOfProgramStudentsByStandard(programId, standardId) {
    return this.http.get(this.baseUrl + "/below-performer/program/" + programId + "/" + standardId).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }

  public getPlansForBelowPerformerOfProgram() {
    return this.http.get(this.baseUrl + "/below-performer/program/plan").toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }

  public getBelowPerfomanceOfDepartment() {
    return this.http.get(this.baseUrl + "/below-performer/department").toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  public getBelowPerfomanceOfDepartmentById(departmentId) {
    return this.http.get(this.baseUrl + "/below-performer/department/" + departmentId).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  public getBelowPerfomanceOfDepartmentStudentsByStandard(departmentId, standardId) {
    return this.http.get(this.baseUrl + "/below-performer/department/" + departmentId + "/" + standardId).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }

  public getPlansForBelowPerformerOfDepartment() {
    return this.http.get(this.baseUrl + "/below-performer/department/plan").toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }

  public getComplaintByDepartmentAndStatus() {
    return this.http.get(this.baseUrl + "/complaint/department-status").toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }

}
