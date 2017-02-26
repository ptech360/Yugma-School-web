import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector:'upload-file',
  templateUrl:'./upload.component.html'
})
export class UploadComponent{
  public uploadForm : FormGroup;
  constructor(){
    this.uploadForm = new FormGroup({
      file : new FormControl('')
    });
  }
  dUrl;
  postFile(event){
    let dataUrl;
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function(){
      dataUrl = reader.result;
      console.log(dataUrl);
    }
    reader.readAsDataURL(input.files[0]);
    this.dUrl = dataUrl;
    // let image = new Image();
    // image.src = dataUrl;
    // document.body.appendChild(image);
  }

  readImage(){
    let image = new Image();
    image.src = this.dUrl;
    document.body.appendChild(image);
  }



}