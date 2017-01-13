import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { UserService } from './services/user.service';

declare var $;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(public userService: UserService) {
  }

  ngAfterViewInit() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    });
  }

  logout() {
    console.log("DASDAS")
    this.userService.logout();
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

}
