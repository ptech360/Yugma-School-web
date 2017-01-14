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

  getComplaintReport() {
    return this.http.get("https://yugmasrgstesting.appspot.com/director/3718285666/complaint/status").map(res => {
     return (res);
   });
  }

}
