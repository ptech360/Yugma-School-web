import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

import { Configuration } from '../../services/app.constant';


@Component({
  selector: 'complaint',
  template: `
    <router-outlet></router-outlet>
  `
})
export class ComplaintComponent {

  constructor(){

  }
}
