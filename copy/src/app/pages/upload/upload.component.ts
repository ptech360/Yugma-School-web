import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Configuration } from '../../services/app.constant';
@Component({
  selector:'upload-file',
  templateUrl:'./upload.component.html',  
})
export class UploadComponent{
  public uploadForm : FormGroup;
  public files : any[] = new Array();
  constructor(private http: Http,private config: Configuration){
    this.uploadForm = new FormGroup({
      file : new FormControl('')
    });
  }
  srcElement;
  postFile(event){
    this.files = event.srcElement.files;
  }

  upload(newfile){
    console.log(newfile);
    let options = this.config.getHeaderForFile();
    let formData = new FormData();      
    formData.append('file',newfile);
    this.http.post("https://yugma-ut.appspot-preview.com/upload-file",formData,options).toPromise().then( res =>{
          console.log(res);
        });
  }
}