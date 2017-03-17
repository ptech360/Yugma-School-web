
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router} from '@angular/router';

// import service
import { ChartService } from '../../services/chart.service';
import { UserService } from '../../services/user.service';
import { ComplaintService } from '../../services/complaint.service'

// import directive
// import { GoogleChart } from '../../customComponent/chart.directive';

declare let google;
declare let $;

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  // @ViewChild(GoogleChart) vc: GoogleChart;
  public complaintByStatus;
  public responseByStatus: any = [];

  public complaintByCategoryAndStatus;
  public responseByCategoryAndStatus;

  public complaintByCategoryAndStatus1;
  public complaintByStatus1;

  public categoryAndStatusChartOptions;
  public complaintByStatusChartOptions;

  constructor(private router: Router,
    public c: ChartService,
    public commonService: ComplaintService) {
    
  }

  ngOnInit() {
    $('.tooltipped').tooltip({ delay: 50 });
    this.commonService.initArray();
    this.commonService.pushUrl("", "");
    this.c.getComplaintByCategoryAndStatus().then((response) => {
      this.responseByCategoryAndStatus = response.json();
      this.chartByCategoryAndStatus();
    });
    this.c.getComplaintByStatus().then((response) => {
      this.responseByStatus = response.json();
      this.chartByStatus();
    });
  }
  ngAfterViewInit() {
    $('.modal').modal();
    $('.collapsible').collapsible({
      expandable: true,
    });
  }
  onResize(event) {
    this.chartByStatus();
    this.chartByCategoryAndStatus();
  }
  expand(chartId) {
    switch (chartId) {
      case 1:
        this.chartByStatus();
        break;
      case 4:
        this.chartByCategoryAndStatus();
        break;
    }
  }
  onSelected(data) {
    $('.modal').modal('close');
    var dataTable = data.wrapper.getDataTable();
    var parts = data.e.targetID.split('#');
    switch (data.chartId.id) {
      case "complaint_chart_by_status":
      case "complaint_chart_by_status1":
        if (parts[0] == "slice") {
          this.router.navigate(['/complaint/status/' + dataTable.getValue(parseInt(parts[1]), 2)]);
        }
        else if (parts[0] == "legendentry")
          console.log("legendentry : " + parts[1]);
        break;
      case "chart_by_category_status":
      case "chart_by_category_status1":
        if (parts[0] == "vAxis") {
          var categoryId = dataTable.getValue(parseInt(parts[parts.indexOf('label') + 1]), 1);
          this.router.navigate(['/complaint/category-status/category/' + categoryId]);
          console.log("categoryId :" + categoryId);
        }
        else if (parts[0] == "bar") {
          console.log(parts);
          var categoryId = dataTable.getValue(parseInt(parts[2]), 1);
          var statusId = dataTable.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
          this.router.navigate(['complaint/category-status/' + categoryId + '/' + statusId]);
          console.log("categoryId :" + categoryId + ",statusId :" + statusId);
        }
        else if (parts[0] == "legendentry") {
          for (var i = 0; i < this.responseByCategoryAndStatus.length; i++) {
            for (var j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
              dataTable.setCell(i, parseInt(this.responseByCategoryAndStatus[i].statusResults[j].statusId) * 2, this.responseByCategoryAndStatus[i].statusResults[j].count);
            }
          }
          if (parseInt(parts[1]) != 6)
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
    }
  }
  chartByStatus() {
    var data = [];
    data.push(['Status', 'complaint', { type: 'number', role: 'scope' }]);
    for (let i = 0; i < this.responseByStatus.length; i++) {
      data.push([this.responseByStatus[i].statusName, this.responseByStatus[i].count, this.responseByStatus[i].statusId]);
    }
    this.complaintByStatus = data;
    this.complaintByStatusChartOptions = {
      title: "Complaints Report - Statuswise",
      titleTextStyle: {
        fontName: 'sans-serif',
        fontSize: 14,
        bold: true,
      },
      colors: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#607D8B'],
      is3D: true
    }
  }


  chartByCategoryAndStatus() {
    var data = [[]];
    data[0].push('categoryName');
    data[0].push({ type: 'number', role: 'scope' });
    for (let i = 0; i < this.responseByCategoryAndStatus[0].statusResults.length; i++) {
      data[0].push(this.responseByCategoryAndStatus[0].statusResults[i].statusName);
      data[0].push({ type: 'number', role: 'scope' });
    }
    data[0].push('All Status');

    for (let i = 0; i < this.responseByCategoryAndStatus.length; i++) {
      data[i + 1] = [];
      data[i + 1].push(this.responseByCategoryAndStatus[i].categoryName);
      data[i + 1].push(this.responseByCategoryAndStatus[i].categoryId);
      for (let j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
        data[i + 1].push(this.responseByCategoryAndStatus[i].statusResults[j].count);
        data[i + 1].push(this.responseByCategoryAndStatus[i].statusResults[j].statusId);
      }
      data[i + 1].push(0);
    }
    this.complaintByCategoryAndStatus = data;
    this.categoryAndStatusChartOptions = {
      title: "Complaint Report - Servicewise",
      titleTextStyle: {
        fontName: 'sans-serif',
        fontSize: 14,
        bold: true,
      },
      isStacked: 'true', chartArea: {},
      colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#FF8C00']
    };
  }
  navigate(url){
    this.router.navigateByUrl(url);
  }

  openModal(whichId) {
    $('#modal1').modal('open');
  }
}