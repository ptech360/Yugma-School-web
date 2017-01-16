import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

declare let Materialize;

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
          <form (ngSubmit)="onSubmit()" [formGroup]="forgetPasswordForm" novalidate>
            <div class="form-content">
              <label>
                <input type="text" formControlName="username" class="sd-form-control" placeholder="username">
                <div style="margin-bottom:16px" *ngIf="!forgetPasswordForm.controls['username'].valid && forgetPasswordForm.controls['username'].touched">required field</div>
              </label>
              <div class="form-submit">
                <button class="btn waves-effect waves-light bcolor" type="submit">Submit</button>
                <a class="right underline" style="padding: 15px 0px 0px 0px;" [routerLink]="['/']">Back To Login</a>
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

  forgetPasswordForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.forgetPasswordForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.invalid) {

    } else {
      this.userService.forgetPassword(this.forgetPasswordForm.value)
      .then((res) => {
        this.router.navigate(["/"]);
        Materialize.toast('New password successfully sent to your registered contact number', 4000);
      }, (err) => {
        Materialize.toast('Username not matched', 4000);
      });
    }
  }

}
