import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router}   from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import service
import { UserService } from '../../services/user.service';
import { ComplaintService } from '../../services/complaint.service';

import { Configuration } from '../../services/app.constant';

declare let Materialize;

@Component({
  selector: 'edit-complaint',
  styleUrls: ['./complaint.component.css'],
  template: `
<div class="row  ">
  <div class="col l6">
    <div class="card">
      <i class="material-icons right icon-button" (click)="goBack()">close</i>
      <div class="form pad">
        <form novalidate>
          <div class="form-content">
            <label>
              Assigned To:
              <input type="text" name="name" [(ngModel)]="assignedEmployeeName" (focus)="employeesList()" class="sd-form-control validate">
            </label>
          </div>

          <div class="row">
              <div *ngFor="let p of priorities; let i = index;">
                <input class="with-gap" name="group1" type="radio" id="{{p.id}}" [checked]="p.id === priority" value="{{p}}" (change)="onPriorityChange(p)"/>
                <label for="{{p.id}}">{{p.name}}</label>
              </div>            
          </div>
          <div class="row" *ngIf="inprogressBtn">
            <p>
              <input type="checkbox" name="isInprogress" class="filled-in" id="filled-in-box" [(ngModel)]="isInprogress" (change)="onInprogress()"/>
              <label for="filled-in-box">InProgress</label>
            </p>
          </div>
          <div class="row">
          <button (click)="editComplaint()" class="btn right margin-btn" [disabled]="submitButton">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  

  <div class="col l6" *ngIf="employees">
    <div class="card">
      <div class="input-field pad">
        <div class="input-field">
          <input placeholder="Search" type="text" class="validate searchBox" (keyup)="searchEmployees($event)">
        </div>
        <div class="teacher-list">
        <ul class="collection" *ngFor="let e of employees">
          <li class="collection-item dismissable" (click)="selectEmployee(e)">
            <div>{{e.name}}<a href="#!" class="secondary-content"><i class="material-icons">reply</i></a></div>
          </li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</div>

  `
})

export class EditComplaint implements OnInit{
  public selectedComplaint;
  employees;
  priorities;
  isInprogress:boolean = false;
  inprogressBtn:boolean = true;
  employeesCOPY;
  assignedEmployeeName: string;
  assignedEmployeeId:any;
  editedComplaint:Object = {};
  priority : {};
  submitButton:boolean = true;

  constructor(private location: Location,
              private c: ComplaintService,
              private config: Configuration,
              private route: ActivatedRoute) {

  }
  ngOnInit(){
    this.getInfoTOEdit();
    this.route.params.subscribe(params => {
      if(params['complaint']){
        this.c.getComplaintById(params['complaint']).then(response => {
          this.selectedComplaint = response.json();          
          this.setComplaintData();          
        });
      }
    });
    
  }
  

  setComplaintData(){
      this.assignedEmployeeName = this.selectedComplaint.assignedEmployeeName;
      this.priority = this.selectedComplaint.priorityId;
      if(this.selectedComplaint.statusId<3) this.inprogressBtn = true;    
        else {this.inprogressBtn = false;}
  }

  validateForm(){
    if(this.assignedEmployeeName == this.selectedComplaint.assignedEmployeeName && this.priority == this.selectedComplaint.priorityId && this.isInprogress == false)
      this.submitButton = true;
    else
      this.submitButton = false;
  }
  goBack() {
    window.history.back();
  }

  getInfoTOEdit() {
    this.c.editInfo()
    .then((res) => {
      this.priorities = res.json().priorities;
      this.employeesCOPY = res.json().employees;
      console.log("DSDSD", this.employees);
    }, (err) => {
      console.log("errr", err)
    });
  }

  employeesList(){
    this.employees = this.employeesCOPY;
  }

  selectEmployee(employee) {
    this.assignedEmployeeName = employee.name;
    if(this.assignedEmployeeName != this.selectedComplaint.assignedEmployeeName)
      this.editedComplaint['assignedTo'] = employee.id;
    else
      delete this.editedComplaint['assignedTo'];
    delete this.employees;
    this.validateForm();
  }

  onPriorityChange(p){    
    this.priority = p.id;
    if(p.id != this.selectedComplaint.priorityId)
      this.editedComplaint['priorityId'] = p.id;
    else  
      delete this.editedComplaint['priorityId'];
    this.validateForm();
  }

  onInprogress(){
    if(this.selectedComplaint.statusId<3 && this.isInprogress)
      this.editedComplaint['statusId'] = 3;
    else
      delete this.editedComplaint['statusId'];
    this.validateForm();
  }

  editComplaint() {
    console.log("comaplaint:",this.editedComplaint);
    this.c.updateComplaint(this.selectedComplaint.id,this.editedComplaint).then((res) =>{
      this.config.showToast("Complaint edited.,.");
      this.goBack();
    }, (err) => {
      this.config.showToast(err);
    });
  }

  loadEmployees() {
    this.employees = this.employeesCOPY;
  }

  searchEmployees(ev: any) {
    console.log("DASDASD", ev.target.value)

    this.loadEmployees();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.employees = this.employeesCOPY.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }

}
