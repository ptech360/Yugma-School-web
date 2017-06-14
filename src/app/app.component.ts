import {Component, ElementRef, ViewChild, AfterViewInit,OnInit} from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { ComplaintService } from './services/complaint.service';

declare let $;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit {
  public user;
  public currentUrl:any;
  public data;

  constructor(public userService: UserService,
              public router: Router,
              public commonService:ComplaintService) {        
              this.user = {
                username: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                role: localStorage.getItem("role"),
                picUrl:localStorage.getItem("picUrl")
              }
              this.commonService.urls.subscribe(data =>{
                this.data = data;
              });
  }

  ngOnInit(){
 
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
  profilePicLoader : boolean = false;
  uploadProfilePic(event){
    
    this.files = event.srcElement.files;
    if(this.files[0]){
      this.profilePicLoader = true;
      this.userService.uploadProfilePic(this.files[0]).then(res =>{
        this.user['picUrl'] = res.json();
        localStorage.setItem('picUrl', res.json());
        this.profilePicLoader = false;
      });
    }
  }

}
