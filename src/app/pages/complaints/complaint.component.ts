import {Component, OnInit} from '@angular/core';

declare let $;

// import service
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'complaints',
  styleUrls: ['./complaint.component.css'],
  templateUrl: './complaint.component.html'
})

export class ComplaintComponent implements OnInit {

  private complaints;
  private complaint = {
    title: ""
  }

  hasData = false;

  constructor(private c: ComplaintService) {
  }

  ngOnInit() {
    $('.modal').modal();
    this.c.getComplaints().then((res) => {
      this.hasData = true;
      this.complaints = res.json();
    }, (err) => {
      this.hasData = true;
      console.log("err", err);
    })
  }

  openModal(complaint) {
    this.complaint = complaint;
    $('#modal1').modal('open');
  }

}
