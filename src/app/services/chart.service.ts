import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response,RequestOptions } from '@angular/http';
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
    return this.http.get(this.baseUrl+"/complaint/status").toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  public getComplaintByCategoryAndStatus() {
    return this.http.get(this.baseUrl+"/complaint/category-status").toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  public getComplaintOfProgramAndStandard() {
    return this.http.get(this.baseUrl+"/complaint/program-standard").toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  public getBelowPerfomanceOfProgram() {
    return this.http.get(this.baseUrl+"/below-performer/program").toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  public getBelowPerfomanceOfProgramById(programId) {
    return this.http.get(this.baseUrl+"/below-performer/program/" + programId).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  public getBelowPerfomanceStudentsByStandard(programId, standardId) {
    return this.http.get(this.baseUrl+"/below-performer/program/" + programId + "/" + standardId).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  public getPlansForBelowPerformer() {
    return this.http.get(this.baseUrl+"/below-performer/program/plan").toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

}
