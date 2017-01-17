import {Component, OnInit,ViewChild,AfterViewInit} from '@angular/core';

// import service
import { ChartService } from '../../services/chart.service';
import { UserService } from '../../services/user.service';

// import directive
import { GoogleChart} from '../../customComponent/chart.directive';

declare let google;
declare let $;

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleChart) vc:GoogleChart;
  public dataTable;
  public complaintByStatus;
  public pie_ChartOptions;
  public plansOfBelowPerformer;
  public complaintByCategoryAndStatus;
  public belowPerformance;
  public complaintByProgramAndStandard;

  public ProgramAndStandardChartOptions;
  public belowPerformanceChartOptions;
  public categoryAndStatusChartOptions;
  public plansChartOptions;

  constructor(public c: ChartService, public userService: UserService) {

  }

  ngOnInit() {
    setTimeout(() => {
      // this.dataTable = new google.visualization.DataTable();
      this.chartByStatus();
      this.chartByProgramAndStandard();
      this.chartOfBelowPerformance();
      this.chartByCategoryAndStatus();
      this.chartByPlans();
    }, 1000);

  }

   ngAfterViewInit(){
    $('.modal').modal();
   }

  onSelected(data){
    var dataTable = data.wrapper.getDataTable();
    var parts = data.e.targetID.split('#');

    switch(data.chartId){
      case "complaint_chart_by_status":
        if(parts[0] == "slice")
          console.log("id :"+dataTable.getValue(parseInt(parts[1]), 2));
        else if(parts[0] == "legendentry")
          console.log("legendentry : "+parts[1]);
      break;
      case "chart_of_below_permance":
        if(parts[0] == "slice")
          console.log("id"+dataTable.getValue(parseInt(parts[1]), 2));
        else if(parts[0] == "legendentry")
          console.log("legendentry : "+parts[1]);
      break;
      case "chart_by_program_standard":
        if (parts[0] == "vAxis") {
          var programId = dataTable.getValue(parseInt(parts[2]), 1);
          console.log("ProgramId :"+programId);
        }
        else if (parts[0] == "bar") {
          var programId = dataTable.getValue(parseInt(parts[2]), 1);
          var standardId = dataTable.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
          console.log("programId :"+programId+",standardId :"+ standardId);
        }
      break;
      case "chart_by_category_status":
        if (parts[0] == "vAxis") {
          var categoryId = dataTable.getValue(parseInt(parts[2]), 1);
          console.log("categoryId :"+categoryId);
        }
        else if (parts[0] == "bar") {
          var categoryId = dataTable.getValue(parseInt(parts[2]), 1);
          var statusId = dataTable.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
          console.log("programId :"+categoryId+",statusId :"+ statusId);
        }
      break;
      case "plan_chart":
        console.log("row :"+parts[2]+", col:"+parts[1]);
      break;

    }
  }
  chartByStatus() {
    this.c.getComplaintByStatus().subscribe((responce) => {
      // var data = this.dataTable;
      var data = new google.visualization.DataTable();
      var res = responce.json();
      data.addColumn('string', 'status');
      data.addColumn('number', 'complaints');
      data.addColumn({ type: 'number', role: 'scope' });
      data.addRows(res.length);
      for (let i = 0; i < res.length; i++) {
        data.setCell(i, 0, res[i].statusName);
        data.setCell(i, 1, res[i].count);
        data.setCell(i, 2, res[i].statusId);
      }
      this.complaintByStatus = data;
      this.pie_ChartOptions = {
        is3D: true
      }
    });
  }
  chartByProgramAndStandard() {
    this.c.getComplaintOfProgramAndStandard().subscribe((responce) => {
      // var data = this.dataTable;
      var data = new google.visualization.DataTable();
      var res = responce.json();
      data.addColumn('string', 'ProgramName');
      data.addColumn({ type: 'number', role: 'scope' });
      for (let i = 0; i < res[0].standardResults.length; i++) {
        data.addColumn('number', res[0].standardResults[i].standardName);
        data.addColumn({ type: 'number', role: 'scope' });
      }

      data.addRows(res.length);
      for (let i = 0; i < res.length; i++) {
        data.setCell(i, 0, res[i].programName);
        data.setCell(i, 1, res[i].programId);
        for (let j = 0; j < res[i].standardResults.length; j++) {
          data.setCell(i, parseInt(res[i].standardResults[j].standardId) * 2, res[i].standardResults[j].count);
          data.setCell(i, parseInt(res[i].standardResults[j].standardId) * 2 + 1, res[i].standardResults[j].standardId);
        }
      }
      this.complaintByProgramAndStandard = data;
      this.ProgramAndStandardChartOptions = { isStacked: 'true', chartArea: { width: '50%' }, };
    });

  }
  chartOfBelowPerformance() {
    this.c.getBelowPerfomanceOfProgram().subscribe((responce) => {
      var data = new google.visualization.DataTable();
      var res = responce.json();
      data.addColumn('string', 'Program');
      data.addColumn('number', 'Performance');
      data.addColumn({ type: 'number', role: 'scope' });
      data.addRows(res.length);
      for (let i = 0; i < res.length; i++) {
        data.setCell(i, 0, res[i].programName);
        data.setCell(i, 1, res[i].count);
        data.setCell(i, 2, res[i].programId);
      }
      this.belowPerformance = data;
      this.belowPerformanceChartOptions = { is3D: true };
    });
  }
  chartByCategoryAndStatus() {
    this.c.getComplaintByCategoryAndStatus().subscribe((responce) => {
      var data = new google.visualization.DataTable();
      var res = responce.json();
      data.addColumn('string', 'categoryName');
      data.addColumn({ type: 'number', role: 'scope' });
      for (let i = 0; i < res[0].statusResults.length; i++) {
        data.addColumn('number', res[0].statusResults[i].statusName);
        data.addColumn({ type: 'number', role: 'scope' });
      }
      data.addRows(res.length);
      var maxVal = res[0].totalCount;
      for (let i = 0; i < res.length; i++) {
        data.setCell(i, 0, res[i].categoryName);
        data.setCell(i, 1, res[i].categoryId);

        for (let j = 0; j < res[i].statusResults.length; j++) {
          data.setCell(i, parseInt(res[i].statusResults[j].statusId) * 2, res[i].statusResults[j].count);
          data.setCell(i, parseInt(res[i].statusResults[j].statusId) * 2 + 1, res[i].statusResults[j].statusId);

        }
        if (res[i].totalCount > maxVal)
          maxVal = res[i].totalCount;
      }
      this.complaintByCategoryAndStatus = data;
      this.categoryAndStatusChartOptions = { isStacked: 'true', chartArea: {}, };
    });
  }
  chartByPlans(){
    this.c.getPlansForBelowPerformer().subscribe(responce => {
      var data = new google.visualization.DataTable();
      var res = responce.json();
      data.addColumn('string', 'programName');
      data.addColumn('number', 'True');
      data.addColumn('number', 'False');

      data.addRows(res.length);
      var pipCountLength;
      for(let i = 0; i < res.length; i++ ){
        data.setCell(i,0,res[i].programName);
        pipCountLength = res[i].pipCount.length;
        if(pipCountLength==1 && res[i].pipCount[0].pip==true){
          data.setCell(i,1,res[i].pipCount[0].count);
          data.setCell(i,2,0);
        }else if(pipCountLength==1 && res[i].pipCount[0].pip==false){
           data.setCell(i,2,res[i].pipCount[0].count);
          data.setCell(i,1,0);
        }else{
           data.setCell(i,1,res[i].pipCount[1].count);
          data.setCell(i,2,res[i].pipCount[0].count);
        }
      }
      this.plansOfBelowPerformer = data;
      this.plansChartOptions = {};
    });

  }

  openModal(whichId) {
    console.log("SASASASASA",whichId, document.getElementById(whichId));
    $('#modal1').modal('open');
  }





}
