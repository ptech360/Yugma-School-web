import { Injectable, EventEmitter }    from '@angular/core';

export class CommonService{
  public urlToTraver : string[] = new Array();
  urls: EventEmitter<any> = new EventEmitter();
  pushUrl(url){
    this.urlToTraver.push(url);
    this.urls.emit(this.urlToTraver);
  }
}