import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Params, Router}   from '@angular/router';
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
  public studentDetail;
  constructor(private route: ActivatedRoute,public c: ChartService){
    
  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      if(params['standardId']&&params['programId']){
        this.drawStudentTable(params['programId'],params['standardId']);
      } 
    });
  }
  drawStudentTable(programId, standardId){
      this.c.getBelowPerfomanceStudentsByStandard(programId, standardId).then(response => {
        this.studentDetail = response.json();
    });
  }
}