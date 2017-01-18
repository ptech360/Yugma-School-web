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
  public studentTableData;
  public studentTableOption;
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
      var data = new google.visualization.DataTable();
      var res = response.json();
      data.addColumn('string', 'Student Name');
      data.addColumn('string', 'Subject Name');
      data.addColumn('boolean', 'Have Plan');
      data.addColumn('date', 'Created At');
      data.addRows(res.length);
      for (let i = 0; i < res.length; i++) {
        data.setCell(i, 0, res[i].studentName);
        data.setCell(i, 1, res[i].subjectName);
        data.setCell(i, 2, res[i].isPIP);
        data.setCell(i, 3, new Date(res[i].createdAt));
      }
      this.studentTableData = data;
      this.studentTableOption = { showRowNumber: true, width: '100%' };
    });
  }
}