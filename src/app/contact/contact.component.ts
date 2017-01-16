import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

declare let Materialize;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact-component.css']
})

export class ContactComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {}

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
    }, passwordMatchValidator);
    function passwordMatchValidator(g: FormGroup) {
       return g.get('newPassword').value === g.get('confirmPassword').value ? null : {'mismatch': true};
    }
  }

  submitForm(): void {
    if (this.resetPasswordForm.invalid) {
      this.checkValidation(this.resetPasswordForm.value);
    } else {
      this.userService.resetPassword(this.resetPasswordForm.value)
      .then((res) => {
        this.router.navigate(["/home"]);
        this.commonToast("Password reset successfully");
        console.log("reset password", res);
      }, (err) => {
        if(err.status === 401) {
          this.commonToast("You have entered wrong old password");
        }
      });
    }
  }

  checkValidation(value) {
    if (!value.oldPassword) {
      this.commonToast("please enter old password.");
    } else if (!value.newPassword) {
      this.commonToast("please enter new password.");
    } else if (!value.confirmPassword) {
      this.commonToast("please enter confirm password.");
    } else if (value.newPassword && value.confirmPassword) {
      this.commonToast("New password and confirm password not matched.");
    }
  }

  commonToast(msg) {
    Materialize.toast(msg, 4000);
  }

}
