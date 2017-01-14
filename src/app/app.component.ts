import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(public userService: UserService, private router: Router) {
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
    this.userService.logout();
    this.router.navigateByUrl("/login");
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

}
