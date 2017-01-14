import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  template: `
  <div class="row valign-wrapper">
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
              </label>
              <label>
                <input type="password" formControlName="password" class="sd-form-control" placeholder="password">
              </label>
              <div class="form-submit">
                <button class="btn waves-effect waves-light bcolor" type="submit">Login</button>
                <a class="right underline" style="padding: 15px 0px 0px 0px;" href="#">Forget Passowrd</a>
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

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    console.log("DASDAS");
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl("/home");
    }
  }

  onSubmit(email, password) {
    console.log(this.loginForm.value);
    this.userService.login(email, password);
    this.router.navigateByUrl("/home");
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
}
