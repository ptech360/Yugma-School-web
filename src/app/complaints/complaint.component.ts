import {Component, OnInit} from '@angular/core';

// import service
import { ComplaintService } from '../services/complaint.service';

@Component({
  selector: 'complaints',
  styleUrls: ['./complaint.component.css'],
  templateUrl: './complaint.component.html'
})

export class ComplaintComponent implements OnInit {

  constructor(private complaint: ComplaintService) {

  }

  ngOnInit() {
    this.complaint.getComplaints().then((res) => {
      console.log("DSADAS", res.json())
    }, (err) => {
      console.log("err", err);
    })
  }

}
