import {Component} from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Configuration } from '../../services/app.constant';
declare let $;
@Component({
  selector:'create-timetable',
  templateUrl:'./timetable.create.html',
  styleUrls:['./timetable.component.css']
})
export class CreateTimetable{
  private standards;
  constructor(private adminService:AdminService, private config:Configuration){
    this.getStandards();
  }
  getStandards() {
    this.adminService.getStandards().then((data) => {
      this.standards = data.json();
    }, (err) => {
      this.standards = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }  
}