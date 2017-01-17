import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

import { Configuration } from '../../services/app.constant';

declare let Materialize;

@Component({
  selector: 'edit-complaint',
  styleUrls: [],
  template: `
  <button (click)="goBack()" class="btn">Back</button>
    <h3>Edit</h3>
  `
})

export class EditComplaint {


  constructor(private location: Location) {

  }

  goBack() {
    this.location.back();
  }

}
