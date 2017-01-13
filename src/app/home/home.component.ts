import {Component, OnInit} from '@angular/core';

// import service
import { ChartService } from '../services/chart.service';

declare let google;

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  public pie_ChartData;
  public pie_ChartOptions;

  constructor(public c: ChartService) {

  }

  ngOnInit() {
    setTimeout(() => { this.complaintByStatus() }, 2000);
  }

  complaintByStatus() {
    var data = new google.visualization.DataTable();
    this.c.getComplaintReport().subscribe((res) => {
      data.addColumn('string','status');
      data.addColumn('number','complaints');
      data.addColumn({type: 'number',role: 'scope'});
      data.addRows(res.json().length);
      for (let i = 0; i < res.json().length; i++) {
        data.setCell(i, 0, res.json()[i].statusName);
        data.setCell(i, 1, res.json()[i].count);
        data.setCell(i, 2, res.json()[i].statusId);
      }
      this.pie_ChartData = data;
      this.pie_ChartOptions = {
        is3D: true
      }
    });
  }

}
