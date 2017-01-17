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
    <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">Assigned To</label>
        </div>
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
    </form>
  </div>
  `
})

export class EditComplaint {


  constructor(private location: Location) {

  }

  goBack() {
    window.history.back();
  }

}
