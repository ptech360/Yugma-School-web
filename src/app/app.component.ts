import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';

declare var $;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private user;
  public currentUrl:any;

  constructor(public userService: UserService,
              private router: Router,
              private commonService:CommonService) {              
              this.user = {
                username: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                role: localStorage.getItem("role"),
                picUrl:localStorage.getItem("picUrl")
              }
              this.commonService.pushUrl(this.router.url);
              this.commonService.urls.subscribe(data =>{
                this.currentUrl = data;
              });
              console.log("adsdf",this.currentUrl);
  }

  ngAfterViewInit() {
    
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration:300,
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
  files;
  uploadProfilePic(event){
    this.files = event.srcElement.files;
    if(this.files[0]){
      this.userService.uploadProfilePic(this.files[0]).then(res =>{
        this.user['picUrl'] = res.json();
        localStorage.setItem('picUrl', res.json());
      });
    }
  }

}
