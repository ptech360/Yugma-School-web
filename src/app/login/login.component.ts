import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  template: `
    <form (ngSubmit)="onSubmit()" [formGroup]="loginForm" novalidate>
      <div class="form-content">
        <label>
          username:
          <input type="text" formControlName="username" class="sd-form-control" placeholder="Enter your username.">
        </label>
        <label>
          password:
          <input type="password" formControlName="password" class="sd-form-control" placeholder="Enter your password.">
        </label>
        <div class="form-submit">
          <button type="submit">Login</button>
        </div>
      </div>
    </form>
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
    console.log(this.loginForm.value)
    this.userService.login(email, password);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
}
