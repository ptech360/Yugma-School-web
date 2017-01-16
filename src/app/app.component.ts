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

  private user;

  constructor(public userService: UserService,
              private router: Router) {


    this.user = {
      username: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role")
    }
  }

  ngAfterViewInit() {

    $('.dropdown-button').dropdown({
      inDuration: 300,
      hover: true,
      alignment: 'left'
    });
    if ($( window ).width() < 376) {
      $('.button-collapse').sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: true,
        draggable: true
      });
    } else {
      $('.button-collapse').sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: false,
        draggable: true
      });
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/");
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

}
