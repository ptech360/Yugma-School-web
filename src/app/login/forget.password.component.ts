import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'forget-password',
  styleUrls: ['./login.component.css'],
  template: `
  <div class="row valign-wrapper">
    <div class="col valign">
      <div class="card">
        <span class="card-title valign-wrapper">
          <span class="valign heading-margin">Forget Password</span>
        </span>
        <div class="card-content">
          <form (ngSubmit)="onSubmit()" [formGroup]="loginForm" novalidate>
            <div class="form-content">
              <label>
                <input type="text" formControlName="username" class="sd-form-control" placeholder="username">
                <div *ngIf="!loginForm.controls['username'].valid && loginForm.controls['username'].touched">required field</div>
              </label>
              <div class="form-submit">
                <button class="btn waves-effect waves-light bcolor" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


  `
})
export class ForgetPasswordComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

}
