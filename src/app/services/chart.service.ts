import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ChartService {

  constructor(private http: Http) {

  }
  
  public getComplaintByStatus() {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/complaint/status").map(res => {
     return (res);
   });
  }

  public getComplaintByCategoryAndStatus() {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/complaint/category-status").map(res => {
     return (res);
   });
  }

  public getComplaintByStatusId(statusId) {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/complaint/status/" + statusId).map(res => {
     return (res);
   });
  }

  public getComplaintByCategoryId(categoryId) {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/complaint/category-status/category/" + categoryId).map(res => {
     return (res);
   });
  }

  public getComplaintByCategoryAndStatusId(categoryId, statusId) {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/complaint/category-status/" + categoryId + "/" + statusId).map(res => {
     return (res);
   });
  }

  public getComplaintOfProgramAndStandard() {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/complaint/program-standard").map(res => {
     return (res);
   });
  }

  public getComplaintOfProgramByProgramId(programId) {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/complaint/program-standard/program/" + programId).map(res => {
     return (res);
   });
  }
  
  public getComplaintOfProgramByStandardId(standardId){
    
  }

  public getComplaintOfProgramByProgramAndStandardId(programId,standardId) {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/complaint/program-standard/" + programId +"/" + standardId).map(res => {
     return (res);
   });
  }

  public getBelowPerfomanceOfProgram() {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/below-performer/program").map(res => {
     return (res);
   });
  }
  public getBelowPerfomanceOfProgramById(programId) {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/below-performer/program/" + programId).map(res => {
     return (res);
   });
  }
  public getBelowPerfomanceStudentsByStandard(programId, standardId) {
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/below-performer/program/" + programId + "/" + standardId).map(res => {
     return (res);
   });    
  }
  
  public getPlansForBelowPerformer(){
    return this.http.get("https://nxtlifeyugmasrgsrkv4.appspot.com/director/3718285666/below-performer/program/plan").map(res => {
     return (res);
   });    
  }

}
