import { Injectable ,EventEmitter} from '@angular/core';
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

  constructor(private http: Http,private config: Configuration) {
    this.baseUrl = this.config.getUrl();
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
  }
  
  getComplaint(url,pageNo){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.config.getUrl() +"/"+ url +"/page/"+pageNo, options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response.json());
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaintById(id){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.config.getUrl() + "/complaint/" + id, options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  getComplaintCommentById(complaintId){
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.config.getUrl()+"/complaint/" + complaintId+"/comment",options).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  postComplaintComment(complaintId,comment){
    console.log("1",comment);
    return this.http.post(this.config.getUrl()+"/complaint/" + complaintId+"/comment",{comment:comment}).toPromise()
    .then((response) =>{
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  updateComplaint(complaintId,complaint){
    return this.http.put(this.config.getUrl()+"/complaint/" + complaintId, complaint).toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

  editInfo() {
    let options = this.config.getHeaderWithWeb();
    return this.http.get(this.config.getUrl() + "/complaint/edit-info", options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }

}
