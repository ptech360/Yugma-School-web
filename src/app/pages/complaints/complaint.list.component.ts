import {Component, OnInit, AfterContentInit} from '@angular/core';
import { Configuration } from '../../services/app.constant';
import { Router } from '@angular/router';

declare let $;

// import service
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'complaint-list',
  styleUrls: ['./complaint.component.css'],
  templateUrl: './complaint.component.html'
})

export class ComplaintListComponent implements OnInit, AfterContentInit {

  private complaints;
  private EmptyComplaints: boolean = false;
  private complaint = {
    title: ""
  }

  private currentPage = 1;

  constructor(private c: ComplaintService,
              private router: Router,
              private config: Configuration) {
                console.log("DASD11111")
  }

  ngOnInit() {
    console.log("DASD")
    $('.modal').modal();
    this.getComplaints();
  }

  ngAfterContentInit() {
    console.log("2222")
  }

  getComplaints() {
    this.c.getComplaints(this.currentPage).then((res) => {
      if (res.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = res.json();
      }
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

  openEditModal(complaint) {
    // this.complaint = complaint;
    // $('#editModal').modal('open');
    // $('select').material_select();
    this.router.navigate(["/complaints/edit"]);
    this.c.editInfo()
    .then((res) => {
      console.log("DSDSD", res.json().employees);
      let employees = res.json().employees;

    }, (err) => {
      console.log("errr", err)
    });
  }

  previousComplaint() {
    delete this.complaints;
    this.currentPage -= 1;
    this.getComplaints();
  }

  nextComplaint() {
    delete this.complaints;
    this.currentPage += 1;
    this.getComplaints();
  }

}
