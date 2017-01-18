import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
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
            <p>
              <input class="with-gap" name="group1" type="radio" id="test1" checked />
              <label for="test1">Red</label>
              <input class="with-gap" name="group1" type="radio" id="test2" checked />
              <label for="test2">blue</label>
              <input class="with-gap" name="group1" type="radio" id="test3" checked />
              <label for="test3">green</label>
            </p>
          </div>
          <div class="row">
            <p>
              <input type="checkbox" class="filled-in" id="filled-in-box" />
              <label for="filled-in-box">InProgress</label>
            </p>
          </div>
          <div class="row">
          <button (click)="goBack()" class="btn right margin-btn">Submit</button>
          <button (click)="editComplaint()" class="btn right margin-btn">Close</button>
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

export class EditComplaint {

  employees;
  employeesCOPY;
  assignedEmployeeName: string;

  constructor(private location: Location,
              private c: ComplaintService) {

  }

  goBack() {
    window.history.back();
  }

  employeesList() {
    this.c.editInfo()
    .then((res) => {
      this.employees = res.json().employees;
      this.employeesCOPY = res.json().employees;
      console.log("DSDSD", this.employees);
    }, (err) => {
      console.log("errr", err)
    });
  }

  selectEmployee(employee) {
    this.assignedEmployeeName = employee.name;
    console.log("FDSfds", name);
    delete this.employees;
  }

  editComplaint() {

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
