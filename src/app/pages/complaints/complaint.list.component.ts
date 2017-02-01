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
  private url:string ="";

  private currentPage = 1;
  constructor(private c: ComplaintService,
              private router: Router,
              private config: Configuration,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.route.pathFromRoot);
    this.route.pathFromRoot.forEach(oe => {
      oe.url.forEach( ie =>{
        ie.forEach( e =>{
          if(e.path)
            this.url += "/" + e.path;
        })
      })
    });
    this.route.params.subscribe(param =>{ if(param['statusId']) this.complaintStatus = param['statusId']})
    this.fetchComplaints();
    $('.modal').modal();
     $('.tooltipped').tooltip({delay: 50});
      $('#chat').modal({
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: 0, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        console.log(modal, trigger);
      }
    });
  }

  fetchComplaints() {
    this.c.getComplaint(this.url, this.currentPage).then((res) => {
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
    this.router.navigate(["/complaint/edit",complaint.id]);
  }

  previousComplaint() {
    delete this.complaints;
    this.currentPage -= 1;
    this.fetchComplaints();
  }

  nextComplaint() {
    delete this.complaints;
    this.currentPage += 1;
    this.fetchComplaints();
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
  complaintIdOfCommentModel;
  currentUser = this.config.getUserId();
  getComplaintCommentById(complaintId){
    this.complaintIdOfCommentModel = complaintId;
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

  comment;
  postComment(){
    if(this.comment)
    this.c.postComplaintComment(this.complaintIdOfCommentModel,this.comment).then((res) =>{
      console.log("submited",res);
      this.comment = "";
    }, (err) => {
      this.config.showToast("Internal server error.. Try again later");
    });
  }

}
