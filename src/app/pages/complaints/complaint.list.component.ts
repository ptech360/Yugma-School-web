import { Component, OnInit } from '@angular/core';
import { Configuration } from '../../services/app.constant';
import { ActivatedRoute, Params, Router}   from '@angular/router';

declare let $;

// import service
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'complaint-list',
  styleUrls: ['./complaint.component.css'],
  templateUrl: './complaint.component.html'
})

export class ComplaintListComponent implements OnInit {

  private complaints;
  private comments;
  private EmptyComments;
  private complaintStatus;
  private complaintsCOPY;
  private EmptyComplaints: boolean = false;
  private complaint = {
    title: ""
  }

  private currentPage = 1;

  constructor(private c: ComplaintService,
              private router: Router,
              private config: Configuration,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['statusId']&&params['categoryId']) {
        this.complaintStatus = params['statusId'];
        this.getComplaintByCategoryAndStatusId(params['categoryId'],params['statusId']);
      }
      else if(params['statusId']&&params['departmentId']) {
        this.complaintStatus = params['statusId'];
        this.getComplaintByDepartmentAndStatusId(params['departmentId'],params['statusId']);
      }        
      else if(params['statusId']){
        this.complaintStatus = params['statusId'];
        this.getComplaintsByStatusId(this.complaintStatus);
      }
      else if(params['categoryId'])
        this.getComplaintByCategoryId(params['categoryId']);
      else if(params['departmentId'])
        this.getComplaintByDepartmentId(params['departmentId']);
      else if(params['standardId']&&params['programId']) 
        this.getComplaintOfProgramByProgramAndStandardId(params['programId'],params['standardId']);
      else if(params['standardId'])
        this.getComplaintByStandardId(params['standardId']);
      else if(params['programId'])
        this.getComplaintOfProgramByProgramId(params['programId']);
      else
        this.getComplaints();
    });
    $('.modal').modal();
     $('.tooltipped').tooltip({delay: 50});
    
  }

  getComplaintByCategoryAndStatusId(categoryId,statusId){
    this.c.getComplaintByCategoryAndStatusId(categoryId,statusId).then((res) => {
      if (res.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = res.json();
        this.complaintsCOPY = res.json();
      }
    }, (err) => {
      this.complaints = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }

  getComplaintByCategoryId(categoryId){
    this.c.getComplaintByCategoryId(categoryId).then((res) => {
      if (res.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = res.json();
        this.complaintsCOPY = res.json();
      }
    }, (err) => {
      this.complaints = [];
      this.config.showToast("Internal server error.. Try again later");
    });

  }

  getComplaintByDepartmentAndStatusId(departmentId,statusId){
    this.c.getComplaintByDepartmentAndStatusId(departmentId,statusId).then((res) => {
      if (res.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = res.json();
        this.complaintsCOPY = res.json();
      }
    }, (err) => {
      this.complaints = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }

  getComplaintByDepartmentId(departmentId){
    this.c.getComplaintByDepartmentId(departmentId).then((res) => {
      if (res.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = res.json();
        this.complaintsCOPY = res.json();
      }
    }, (err) => {
      this.complaints = [];
      this.config.showToast("Internal server error.. Try again later");
    });

  }

  getComplaintOfProgramByProgramAndStandardId(programId,standardId){
    this.c.getComplaintOfProgramByProgramAndStandardId(programId,standardId).then((res) => {
      if (res.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = res.json();
        this.complaintsCOPY = res.json();
      }
    }, (err) => {
      this.complaints = [];
      this.config.showToast("Internal server error.. Try again later");
    });

  }

  getComplaintByStandardId(standardId){

  }

  getComplaintOfProgramByProgramId(programId){
    this.c.getComplaintOfProgramByProgramId(programId).then((res) => {
      if (res.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = res.json();
        this.complaintsCOPY = res.json();
      }
    }, (err) => {
      this.complaints = [];
      this.config.showToast("Internal server error.. Try again later");
    });

  }

  getComplaints() {
    this.c.getComplaints(this.currentPage).then((res) => {
      if (res.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = res.json();
        this.complaintsCOPY = res.json();
      }
    }, (err) => {
      this.complaints = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }

  getComplaintsByStatusId(statusId){
    this.c.getComplaintByStatusId(statusId).then((res) => {
      if (res.status === 204) {
        this.EmptyComplaints = true;
      } else {
        this.EmptyComplaints = false;
        this.complaints = res.json();
        this.complaintsCOPY = res.json();
      }
    }, (err) => {
      this.complaints = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }
  openModal(complaint) {
    this.complaint = complaint;
    $('#modal1').modal('open');
  }

  openEditModal(complaint) {
    this.complaint = complaint;
    this.router.navigate(["/complaints/edit",complaint.id]);
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

  loadComplaints() {
    this.complaints = this.complaintsCOPY;
  }

  searchComplaints(ev: any) {
    this.loadComplaints();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.complaints = this.complaintsCOPY.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  getComplaintCommentById(complaintId){
    this.c.getComplaintCommentById(complaintId).then((res) => {
      if (res.status === 204) {
        this.EmptyComments = true;
      } else {
        this.EmptyComments = false;
        this.comments = res.json();
        console.log("comments",this.comments);
      }
    }, (err) => {
      this.comments = [];
      this.config.showToast("Internal server error.. Try again later");
    });
  }

}
