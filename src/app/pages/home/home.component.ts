
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

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

  public complaintByCategoryAndStatus;
  public responseByCategoryAndStatus;

  public categoryAndStatusChartOptions;
  public complaintByStatusChartOptions;

  constructor(private router: Router,
              public c: ChartService, 
              public route:ActivatedRoute,
              public userService: UserService) {
              this.userService.urlToTravers = this.router.url;
              this.c.getComplaintByCategoryAndStatus().then((response) => {
                this.responseByCategoryAndStatus = response.json();
              });
              this.c.getComplaintByStatus().then((response) => {
                this.responseByStatus = response.json();
              });
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.chartByStatus();
      this.chartByCategoryAndStatus();
    }, 1000);
    $('.tooltipped').tooltip({ delay: 50 });
  }
  ngAfterViewInit() {
    $('.modal').modal();
      $('.collapsible').collapsible({
      expandable: true, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
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
          this.router.navigate(['/complaint/status/'+dataTable.getValue(parseInt(parts[1]), 2)]);
        }
        else if (parts[0] == "legendentry")
          console.log("legendentry : " + parts[1]);
        break;
      case "chart_by_category_status":
      case "chart_by_category_status1":
        if (parts[0] == "vAxis") {
          var categoryId = dataTable.getValue(parseInt(parts[parts.indexOf('label') + 1]), 1);
          this.router.navigate(['/complaint/category-status/category/'+categoryId]);
          console.log("categoryId :" + categoryId);
        }
        else if (parts[0] == "bar") {
          console.log(parts);
          var categoryId = dataTable.getValue(parseInt(parts[2]), 1);
          var statusId = dataTable.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
          this.router.navigate(['complaint/category-status/'+categoryId+'/'+ statusId]);
          console.log("categoryId :" + categoryId + ",statusId :" + statusId);
        }
        else if (parts[0] == "legendentry") {
          for (var i = 0; i < this.responseByCategoryAndStatus.length; i++) {
            for (var j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
              dataTable.setCell(i, parseInt(this.responseByCategoryAndStatus[i].statusResults[j].statusId) * 2, this.responseByCategoryAndStatus[i].statusResults[j].count);
            }
          }
          if(parseInt(parts[1])!= 6)
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
      titleTextStyle : {
							fontName : 'sans-serif',
							fontSize : 14,
							bold : true,
							},
      colors: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#607D8B'],
      is3D: true
    }
  }


  chartByCategoryAndStatus() {
    var data = new google.visualization.DataTable();
    var res = this.responseByCategoryAndStatus;
    console.log("asdf",res);
    data.addColumn('string', 'categoryName');
    data.addColumn({ type: 'number', role: 'scope' });
    for (let i = 0; i < res[0].statusResults.length; i++) {
      data.addColumn('number', res[0].statusResults[i].statusName);
      data.addColumn({ type: 'number', role: 'scope' });
    }
    data.addColumn('number', 'All Status');
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
      title: "Complaint Report - Servicewise",
      titleTextStyle : {
							fontName : 'sans-serif',
							fontSize : 14,
							bold : true,
							},
      isStacked: 'true', chartArea: {},
      colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0','#FF8C00']
    };
  }

  openModal(whichId) {
    console.log("SASASASASA", whichId, document.getElementById(whichId));
    $('#modal1').modal('open');
  }
}