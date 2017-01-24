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
        this.drawStudentTableByProgram(params['programId'],params['standardId']);
      }else if(params['standardId']&&params['departmentId']) {
        this.drawStudentTableByDepartment(params['standardId'],params['departmentId']);
      }
    });
  }
  drawStudentTableByProgram(programId, standardId){
      this.c.getBelowPerfomanceOfProgramStudentsByStandard(programId, standardId).then(response => {
        this.studentDetail = response.json();
    });
  }
  drawStudentTableByDepartment(departmentId, standardId){
      this.c.getBelowPerfomanceOfDepartmentStudentsByStandard(departmentId, standardId).then(response => {
        this.studentDetail = response.json();
    });
  }
}