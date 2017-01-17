import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

// import service
import { ChartService } from '../../services/chart.service';
import { UserService } from '../../services/user.service';

declare let google;

@Component({
  selector: 'student-detail',
  styleUrls: ['./student-detail.css'],
  templateUrl: './student-detail.component.html'
})
export class StudentDetail implements OnInit{
  constructor(){
    
  }
}