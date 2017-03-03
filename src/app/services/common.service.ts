import { Injectable, EventEmitter }    from '@angular/core';

import { Http } from '@angular/http';

@Injectable()
export class CommonService{

  constructor(private http:Http) {

  }

  public urlToTraver = new Array();
  urls: EventEmitter<any> = new EventEmitter();

  initArray() {
    this.urlToTraver = [];
  }

  pushUrl(title, url){
    this.urlToTraver.push({
      title: title,
      url: url
    });
    
    this.urls.emit(this.urlToTraver);
    console.log("qwqwqwq", this.urlToTraver);
  }
}