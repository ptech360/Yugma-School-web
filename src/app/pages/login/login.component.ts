import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Configuration } from '../../services/app.constant';

declare let Materialize;
declare var $;

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  template: `
    <div class="row valign-wrapper login-card">
      <div class="col valign">
        <div class="card">
          <span class="card-title valign-wrapper">
            <span class="valign heading-margin">Log in</span>
          </span>
          <div class="card-content">
            <form (ngSubmit)="onSubmit()" [formGroup]="loginForm" novalidate>
              <div class="form-content">
                <label>
                  <input type="text" formControlName="username" class="sd-form-control" placeholder="username">
                  <div *ngIf="!loginForm.controls['username'].valid && loginForm.controls['username'].touched">required field</div>
                </label>
                <label>
                  <input type="password" formControlName="password" class="sd-form-control" placeholder="password">
                  <div style="margin-bottom:16px" *ngIf="!loginForm.controls['password'].valid && loginForm.controls['password'].touched">required field</div>
                </label>
                <div class="form-submit">
                  <button class="btn waves-effect waves-light bcolor" type="submit">Login</button>
                  <loader class="loading" [condition]="hasSubmit"></loader>
                  <a class="right underline" style="padding: 15px 0px 0px 0px;" [routerLink]="['/parent/forget-password']">Forget Password</a>
                </div>
              </div>
            </form>
          </div>
          <div class="card-action login-footer valign-wrapper">
            <span class="valign">
              <a class="underline">Register account</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hasSubmit: boolean = false;

  constructor(private userService: UserService,
              private router: Router,
              private config: Configuration,
              private formBuilder: FormBuilder) {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl("/home");
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(email, password) {
    if (this.loginForm.invalid) {

    } else {
      this.hasSubmit = true;
      this.userService.login(this.loginForm.value)
      .then((res) => {
        this.userService.getManagementInfo()
        .then((data) => {
          this.userService.storeManagementData(data.json());
          location.reload();
        });
      }, (err) => {
        this.hasSubmit = false;
        if (err.status === 400) {
          this.config.showToast("Invalid username or password");
        }
      });
    }
  }

}
