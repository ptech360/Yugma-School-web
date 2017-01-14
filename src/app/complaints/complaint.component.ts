import {Component, OnInit, AfterViewInit} from '@angular/core';

declare let $;

// import service
import { ComplaintService } from '../services/complaint.service';

@Component({
  selector: 'complaints',
  styleUrls: ['./complaint.component.css'],
  templateUrl: './complaint.component.html'
})

export class ComplaintComponent implements AfterViewInit {

  private complaints;

  constructor(private complaint: ComplaintService) {
    this.complaint.getComplaints().then((res) => {
      console.log("DSADAS", res.json());
      this.complaints = res.json();
    }, (err) => {
      console.log("err", err);
    })
  }

  ngAfterViewInit() {
    $('.modal').modal();
  }

  // ngOnInit() {
  //   $('.modal').modal();
  //   this.complaint.getComplaints().then((res) => {
  //     console.log("DSADAS", res.json());
  //     this.complaints = res.json();
  //   }, (err) => {
  //     console.log("err", err);
  //   })
  // }

}
