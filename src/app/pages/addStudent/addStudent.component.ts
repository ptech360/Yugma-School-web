import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Configuration } from '../../services/app.constant';
// import * as _ from 'underscore';
declare let $;
@Component({
  selector: 'add-student',
  templateUrl: './addStudent.component.html'
})
export class AddStudentComponent implements OnInit {
  private newStudent: FormGroup;
  private newStudentForExistingParent: FormGroup;
  private isExistingParent: boolean = false;
  private standards;
  private parentList;
  constructor(private adminService: AdminService, private config: Configuration, private formBuilder: FormBuilder) {
    this.getStandards();
    this.getParents();
    this.newStudentForExistingParent = this.formBuilder.group({
      "parentId": [''],
      "students": this.formBuilder.array([
      ])
    });
    this.newStudent = this.formBuilder.group({
      "name": ['', Validators.required],
      "nickName": ['', Validators.required],
      "contactNo": ['', Validators.required],
      "email": ['', Validators.required],
      "students": this.formBuilder.array([
      ])
    });
  }

  ngOnInit() {
    // this.addStudent(this.newStudentForExistingParent);
    this.addStudent(this.newStudent);
  }


  check(e) {
    if (e == 'A')
      this.isExistingParent = false;
    else
      this.isExistingParent = true;
  }
  addStudent(e) {
    const control = <FormArray>e.controls['students'];
    control.push(this.inItStudent());
  }
  removeStudent(form, index) {
    const control = <FormArray>form.controls['students'];
    control.removeAt(index);
  }
  inItStudent() {
    return this.formBuilder.group({
      "name": ['', Validators.required],
      "standardId": ['', Validators.required]
    });
  }
  submitStudentDetail() {
    this.adminService.addStudent(this.newStudent.value).then((res)=>{
        this.newStudent.reset();
        var response = res.json();
        if(response['students'])
          delete response['students'];
        this.parents.push(response);
    }, (err) => {
      this.config.showToast("Internal server error.. Try again later");
    });
  }
  submitStudentDetailWithExistingParent() {
    console.log(this.newStudentForExistingParent.value);
    this.adminService.addStudentWithExistingUser(this.newStudentForExistingParent.value).then((res)=>{
        this.students.push(res.json());
        this.removeStudent(this.newStudentForExistingParent,0);
    }, (err) => {
      this.config.showToast("Internal server error.. Try again later");
    });
  }
  getStandards() {
    this.adminService.getStandards().then((data) => {
      this.standards = data.json();
    }, (err) => {
      this.standards = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }
  getParents(){
    this.adminService.getParents().then((data) =>{
      this.parentList = data.json();
      this.parentsCOPY = data.json();
    }, (err) => {
      this.parentList = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }  
  deleteStudent(student,i){
    this.adminService.deleteStudent(student.id).then((res)=>{
      console.log(res);
      this.students.splice(i,1);
    }, (err) => {
      this.config.showToast("Internal server error.. Try again later");
    });
  }
  save =[];
  updateStudent(stu,i){
    if(stu.name != this.studentsCopy[i].name && stu.standardId != this.studentsCopy[i].standardId){
      this.adminService.updateStudent(stu.id,{name:stu.name,standardId:stu.standardId});
    }else if(stu.name != this.studentsCopy[i].name){
      this.adminService.updateStudent(stu.id,{name:stu.name});
    }else if(stu.standardId != this.studentsCopy[i].standardId){
      this.adminService.updateStudent(stu.id,{standardId:stu.standardId});
    }else
      console.log("Nothing Changed");
  }
  parents;
  parentsCOPY;
  loadParents() {
    this.parents = this.parentsCOPY;
  }
  searchParents(ev: any) {
    this.loadParents();
    let val = ev.target.value;
    console.log(ev.keyCode);
    if (val && val.trim() != '') {
      this.parents = this.parentsCOPY.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  edit:boolean = false;
  assignedParentName;
  parentId;
  parentDetail;
  parentForm : FormGroup;
  

  students = [];
  studentsCopy = [];
  selectedIndex;
  selectParent(parent,index) {
    this.selectedIndex = index;
    this.assignedParentName = parent.name;
    this.parentId = parent.id;
    this.parentDetail = parent;
    this.parentForm = this.formBuilder.group({
      "id":new FormControl(parent.id),
      "name":new FormControl(parent.name,[Validators.required]),
      "email":new FormControl(parent.email,[Validators.required]),
      "contactNo":new FormControl(parent.contactNo,[Validators.required, Validators.pattern('[2-9]{2}[0-9]{8}$')])      
    });
       
    delete this.parents;
    this.save = [];
    this.adminService.getStudentsByParentId(parent.id).then((data) =>{
      this.students = data.json();
      this.studentsCopy = data.json();
    }, (err) => {
      this.students = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }
  focusOnList() {
    this.parents = this.parentsCOPY;
  }
  saveParentStudent(){
    if(this.parentForm.valid){
      var id = this.parentForm.value['id'];
      var object = this.parentForm.value;
      this.adminService.updateParent(id,object).then(res => {
        this.edit = false;
      });
    }
  }
}