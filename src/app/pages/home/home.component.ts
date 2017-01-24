
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

// import service
import { ChartService } from '../../services/chart.service';
import { UserService } from '../../services/user.service';

// import directive
import { GoogleChart } from '../../customComponent/chart.directive';

declare let google;
declare let $;

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleChart) vc: GoogleChart;
  public complaintByStatus;
  public responseByStatus;

  public plansOfBelowPerformer;
  public responseOfBelowPerformer;

  public complaintByCategoryAndStatus;
  public responseByCategoryAndStatus;

  public complaintByDepartmentAndStatus;
  public responseByDepartmentAndStatus;

  public belowPerformance;
  public responseOfbelowPerformance;

  public complaintByProgramAndStandard;
  public responseByProgramAndStandard;

  public drilled;
  public ProgramAndStandardChartOptions;
  public belowPerformanceChartOptions;
  public categoryAndStatusChartOptions;
  public departmentAndStatusChartOptions;
  public plansChartOptions;
  public complaintByStatusChartOptions;

  constructor(private router: Router, public c: ChartService) {
    this.c.getComplaintByCategoryAndStatus().then((response) => {
      this.responseByCategoryAndStatus = response.json();
    });
    this.c.getComplaintByDepartmentAndStatus().then((response) => {
      this.responseByDepartmentAndStatus = response.json();
    });
    this.c.getComplaintByStatus().then((response) => {
      this.responseByStatus = response.json();
    });
    this.c.getComplaintOfProgramAndStandard().then((response) => {
      this.responseByProgramAndStandard = response.json();
    });
    this.c.getBelowPerfomanceOfProgram().then((response) => {
      this.responseOfbelowPerformance = response.json();
    });
    this.c.getPlansForBelowPerformer().then(response => {
      this.responseOfBelowPerformer = response.json();
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.chartByStatus();
      this.chartByProgramAndStandard();
      this.chartByDepartmentAndStatus();
      this.chartOfBelowPerformance();
      this.chartByCategoryAndStatus();
      this.chartByPlans();
    }, 1000);
    $('.tooltipped').tooltip({ delay: 50 });
  }
  ngAfterViewInit() {
    $('.modal').modal();
  }
  onResize(event) {
    this.chartByStatus();
    this.chartByCategoryAndStatus();
    this.chartByDepartmentAndStatus();
    this.chartByProgramAndStandard();
    this.chartOfBelowPerformance();
    this.chartByPlans();
  }
  expand(chartId) {
    switch (chartId) {
      case 1:
        this.chartByStatus();
        break;
      case 2:
        this.chartOfBelowPerformance();
        break;
      case 3:
        this.chartByProgramAndStandard();
        break;
      case 4:
        this.chartByCategoryAndStatus();
        break;
      case 5:
        this.chartByPlans();
        break;
      case 6:
        this.chartByDepartmentAndStatus();
        break;
      default:
        break;
    }
  }
  onSelected(data) {
    var dataTable = data.wrapper.getDataTable();
    var parts = data.e.targetID.split('#');
    switch (data.chartId.id) {
      case "complaint_chart_by_status":
      case "complaint_chart_by_status1":
        if (parts[0] == "slice") {
          this.router.navigate(['/complaints/status', dataTable.getValue(parseInt(parts[1]), 2)]);
        }
        else if (parts[0] == "legendentry")
          console.log("legendentry : " + parts[1]);
        break;
      case "chart_of_below_permance":
      case "chart_of_below_permance1":
        if (parts[0] == "slice") {
          var programId = dataTable.getValue(parseInt(parts[1]), 2);
          if (this.drilled) {
            var standardId = dataTable.getValue(parseInt(parts[1]), 2);
            this.router.navigate(['student-detail', programId, standardId]);
          }
          else
            this.chartByProgramId(programId, data.chartId);
          console.log("id" + programId, 2);
        }
        else if (parts[0] == "legendentry")
          console.log("legendentry : " + parts[1]);
        break;
      case "chart_by_program_standard":
      case "chart_by_program_standard1":
        if (parts[0] == "vAxis") {
          var programId = dataTable.getValue(parseInt(parts[parts.indexOf('label') + 1]), 1);
          this.router.navigate(['/complaints/program', programId]);
          console.log("ProgramId :" + programId);
        }
        else if (parts[0] == "bar") {
          var programId = dataTable.getValue(parseInt(parts[2]), 1);
          var standardId = dataTable.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
          this.router.navigate(['/complaints/program-standard', programId, standardId]);
          console.log("programId :" + programId + ",standardId :" + standardId);
        }
        break;
      case "chart_by_category_status":
      case "chart_by_category_status1":
        if (parts[0] == "vAxis") {
          var categoryId = dataTable.getValue(parseInt(parts[parts.indexOf('label') + 1]), 1);
          this.router.navigate(['/complaints/category', categoryId]);
          console.log("categoryId :" + categoryId);
        }
        else if (parts[0] == "bar") {
          console.log(parts);
          var categoryId = dataTable.getValue(parseInt(parts[2]), 1);
          var statusId = dataTable.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
          this.router.navigate(['complaints/category-status', categoryId, statusId]);
          console.log("categoryId :" + categoryId + ",statusId :" + statusId);
        }
        else if (parts[0] == "legendentry") {
          for (var i = 0; i < this.responseByCategoryAndStatus.length; i++) {
            for (var j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
              dataTable.setCell(i, parseInt(this.responseByCategoryAndStatus[i].statusResults[j].statusId) * 2, this.responseByCategoryAndStatus[i].statusResults[j].count);
            }
          }
          for (var i = 0; i < this.responseByCategoryAndStatus.length; i++) {
            for (var j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
              if (j != parseInt(parts[1]))
                dataTable.setCell(i, parseInt(this.responseByCategoryAndStatus[i].statusResults[j].statusId) * 2, 0);
            }
          }
          data.wrapper.draw();
          console.log("legendentry : " + parts[1]);
        }
        break;
      case "chart_by_department_status":
      case "chart_by_department_status1":
        if (parts[0] == "vAxis") {
          var departmentId = dataTable.getValue(parseInt(parts[parts.indexOf('label') + 1]), 1);
          this.router.navigate(['/complaints/department', departmentId]);
          console.log("departmentId :" + departmentId);
        }
        else if (parts[0] == "bar") {
          console.log(parts);
          var departmentId = dataTable.getValue(parseInt(parts[2]), 1);
          var statusId = dataTable.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
          this.router.navigate(['complaints/department-status', departmentId, statusId]);
          console.log("departmentId :" + departmentId + ",statusId :" + statusId);
        }
        else if (parts[0] == "legendentry") {
          for (var i = 0; i < this.responseByDepartmentAndStatus.length; i++) {
            for (var j = 0; j < this.responseByDepartmentAndStatus[i].statusResults.length; j++) {
              dataTable.setCell(i, parseInt(this.responseByDepartmentAndStatus[i].statusResults[j].statusId) * 2, this.responseByDepartmentAndStatus[i].statusResults[j].count);
            }
          }
          for (var i = 0; i < this.responseByDepartmentAndStatus.length; i++) {
            for (var j = 0; j < this.responseByDepartmentAndStatus[i].statusResults.length; j++) {
              if (j != parseInt(parts[1]))
                dataTable.setCell(i, parseInt(this.responseByDepartmentAndStatus[i].statusResults[j].statusId) * 2, 0);
            }
          }
          data.wrapper.draw();
          console.log("legendentry : " + parts[1]);
        }
        break;
      case "plan_chart":
      case "plan_chart1":
        console.log("row :" + parts[2] + ", col:" + parts[1]);
        break;

    }
  }
  chartByStatus() {
    // this.c.getComplaintByStatus().then((response) => {
      var data = new google.visualization.DataTable();
      var res = this.responseByStatus;
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
      this.complaintByStatusChartOptions = {
        title: "Complaints Report - Statuswise",
        colors: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#607D8B'],
        is3D: true
      }
    // });
  }
  chartByProgramAndStandard() {
    // this.c.getComplaintOfProgramAndStandard().then((response) => {
      var data = new google.visualization.DataTable();
      var res = this.responseByProgramAndStandard;
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
      this.ProgramAndStandardChartOptions = {
        title: "Complaint Report - Programwise",
        colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0'],
        isStacked: 'true',
        chartArea: { width: '50%' },
      };
    // });

  }
  chartOfBelowPerformance() {
    this.drilled = false;
    // this.c.getBelowPerfomanceOfProgram().then((response) => {
      var data = new google.visualization.DataTable();
      var res = this.responseOfbelowPerformance;
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
      this.belowPerformanceChartOptions = {
        title: "Below Performance Report - Programwise",
        colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0'],
        is3D: true
      };
    // });
  }

  chartByProgramId(programId, containerId) {
    this.drilled = true;
    this.c.getBelowPerfomanceOfProgramById(programId).then(response => {
      var data = new google.visualization.DataTable();
      var res = response.json();
      data.addColumn('string', 'Standard');
      data.addColumn('number', 'Performance');
      data.addColumn({ type: 'number', role: 'scope' });
      data.addRows(res.length);
      for (let i = 0; i < res.length; i++) {
        data.setCell(i, 0, res[i].standardName);
        data.setCell(i, 1, res[i].count);
        data.setCell(i, 2, res[i].standardId);
      }
      var options = {
        title: 'Below Performance Report - Yearwise',
        colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0'],
        is3D: true
      };
      var chartType = "PieChart";
      this.vc.drawGraph(options, chartType, data, containerId);
    });
  }

  back() {
    this.chartOfBelowPerformance();
  }

  chartByCategoryAndStatus() {
    // this.c.getComplaintByCategoryAndStatus().then((response) => {
      // this.responseByCategoryAndStatus = response.json();
      var data = new google.visualization.DataTable();
      var res = this.responseByCategoryAndStatus;
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
      this.categoryAndStatusChartOptions = {
        title: "Complaint Report - Categorywise",
        isStacked: 'true', chartArea: {},
        colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0']
      };
    // });
  }

  chartByDepartmentAndStatus() {
    // this.c.getComplaintByDepartmentAndStatus().then((response) => {
      // this.responseByDepartmentAndStatus = response.json();
      var data = new google.visualization.DataTable();
      var res = this.responseByDepartmentAndStatus;
      data.addColumn('string', 'departmentName');
      data.addColumn({ type: 'number', role: 'scope' });
      for (let i = 0; i < res[0].statusResults.length; i++) {
        data.addColumn('number', res[0].statusResults[i].statusName);
        data.addColumn({ type: 'number', role: 'scope' });
      }
      data.addRows(res.length);
      var maxVal = res[0].totalCount;
      for (let i = 0; i < res.length; i++) {
        data.setCell(i, 0, res[i].departmentName);
        data.setCell(i, 1, res[i].departmentId);

        for (let j = 0; j < res[i].statusResults.length; j++) {
          data.setCell(i, parseInt(res[i].statusResults[j].statusId) * 2, res[i].statusResults[j].count);
          data.setCell(i, parseInt(res[i].statusResults[j].statusId) * 2 + 1, res[i].statusResults[j].statusId);
        }
        if (res[i].totalCount > maxVal)
          maxVal = res[i].totalCount;
      }
      this.complaintByDepartmentAndStatus = data;
      this.departmentAndStatusChartOptions = {
        title: "Complaint Report - Departmentwise",
        isStacked: 'true', chartArea: {},
        colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0']
      };
    // });
  }

  chartByPlans() {
    // this.c.getPlansForBelowPerformer().then(response => {
      var data = new google.visualization.DataTable();
      var res = this.responseOfBelowPerformer;
      data.addColumn('string', 'programName');
      data.addColumn('number', 'True');
      data.addColumn('number', 'False');
      data.addRows(res.length);
      var pipCountLength;
      for (let i = 0; i < res.length; i++) {
        data.setCell(i, 0, res[i].programName);
        pipCountLength = res[i].pipCount.length;
        if (pipCountLength == 1 && res[i].pipCount[0].pip == true) {
          data.setCell(i, 1, res[i].pipCount[0].count);
          data.setCell(i, 2, 0);
        } else if (pipCountLength == 1 && res[i].pipCount[0].pip == false) {
          data.setCell(i, 2, res[i].pipCount[0].count);
          data.setCell(i, 1, 0);
        } else {
          data.setCell(i, 1, res[i].pipCount[1].count);
          data.setCell(i, 2, res[i].pipCount[0].count);
        }
      }
      this.plansOfBelowPerformer = data;
      this.plansChartOptions = { title: 'Plans For Below Performers' };
    // });

  }
  openModal(whichId) {
    console.log("SASASASASA", whichId, document.getElementById(whichId));
    $('#modal1').modal('open');
  }
}