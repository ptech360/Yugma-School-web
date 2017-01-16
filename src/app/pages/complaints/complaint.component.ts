import {Component, OnInit} from '@angular/core';
import { Configuration } from '../../services/app.constant';

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

  private currentPage = 1;

  constructor(private c: ComplaintService,
              private config: Configuration) {
  }

  ngOnInit() {
    $('.modal').modal();
    this.c.getComplaints(this.currentPage).then((res) => {
      this.complaints = res.json();
    }, (err) => {
      this.complaints = [];
      this.config.showToast("Internal server error.. Try again later");
      console.log("err", err);
    });
  }

  openModal(complaint) {
    this.complaint = complaint;
    $('#modal1').modal('open');
  }

}
