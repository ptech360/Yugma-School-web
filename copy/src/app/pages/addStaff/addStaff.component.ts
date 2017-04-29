import {Component, ViewEncapsulation, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Configuration } from '../../services/app.constant';
import { AdminService} from '../../services/admin.service';
import { ValidationService } from '../../services/formValidation.service';
import { ComplaintService } from '../../services/complaint.service';
import { UserService } from '../../services/user.service';
declare let $;
@Component({
  selector: 'add-staff',
  styleUrls: ['./addStaff.component.css'],
  templateUrl: './addStaff.component.html',
})
export class AddStaffComponent implements OnInit{
  public addStaffForm : FormGroup;
  public subjects : Array<Object> = [];
  public standards : Array<Object> = [];
  public selectedStandard;
  public selectedSubject : any;
  public objectArray : Array<Object> = [];
  public objectArrayToDisplay : Array<Object> = [];
  public isSubmit : boolean = false;
  public isTeacher : boolean = false;

  constructor(private formBuilder: FormBuilder, private adminService:AdminService,private config: Configuration, private commonService : ComplaintService,private userService:UserService) {
    this.addStaffForm = new FormGroup({
      name : new FormControl('',[Validators.required,Validators.maxLength(40)]),
      username: new FormControl('',[Validators.required]),
      nickName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      contactNo: new FormControl('',[Validators.required, Validators.pattern('[2-9]{2}[0-9]{8}$')]),
      password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,100}$')]),
    });
    this.commonService.initArray();
    this.commonService.pushUrl("ADD Staff", "/add-staff");
  }

  ngOnInit(){
    this.getSubjects();
    this.getStandards();
  }

  getSubjects() {
    this.adminService.getSubjects().then(data =>{
      console.log("Subjects are", data.json());
      this.subjects = data.json();
    }, (err) => {
      this.subjects = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }

  getStandards() {
    this.adminService.getStandards().then((data) => {
      console.log("Standards are", data.json());
      this.standards = data.json();
    }, (err) => {
      this.standards = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }

  response;
  addStaffData(){
    this.addStaffForm.value["standardSubjects"] = this.objectArray;
    this.adminService.addEmployee(this.addStaffForm.value).then(res => {
      this.response = res.json();
      console.log(this.response);
      delete this.objectArray;
      delete this.objectArrayToDisplay;      
      this.isSubmit = true;
      this.isTeacher = false;
    });
  }

  pushOnObjectArray(){
    this.objectArray.push({
      standardId:this.selectedStandard.id,
      subjectId : this.selectedSubject.id
    });
    this.objectArrayToDisplay.push({
      standard:this.selectedStandard.name,
      subject : this.selectedSubject.name,
      standardId:this.selectedStandard.id,
      subjectId : this.selectedSubject.id
    });
    this.selectedStandard = '';
    this.selectedSubject = '';
  }
  removeFromObjectArray(obj){
    for (var i = 0; i < this.objectArray.length; i++) {
      if(obj['standardId']==this.objectArray[i]['standardId']&&obj['subjectId']==this.objectArray[i]['subjectId']){
        this.objectArray.splice(i,1);
        this.objectArrayToDisplay.splice(i,1);
      }
    }    
  }
  addAnotherForm(){
    this.addStaffForm.reset();
    this.isSubmit = false;
  }
  files;
  userProfile;
  uploadProfilePic(event){
    this.files = event.srcElement.files;
    if(this.files[0]){
      this.userService.uploadEmployeePic(this.response.id,this.files[0]).then(res =>{
        this.userProfile = res.json();
      });
    }
  } 
}