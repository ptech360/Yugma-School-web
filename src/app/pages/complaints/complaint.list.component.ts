import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Configuration } from '../../services/app.constant';
import { ActivatedRoute, Params, Router}   from '@angular/router';
import { UserService } from '../../services/user.service';

declare let $;

// import service
import { ComplaintService } from '../../services/complaint.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'complaint-list',
  styleUrls: ['./complaint.component.css'],
  templateUrl: './complaint.component.html',
  providers:[CommonService]
})

export class ComplaintListComponent implements OnInit,AfterViewInit{
  public complaints;
  private comments;
  private EmptyComments;
  private complaintStatus;
  private complaintCategory;
  private complaintsCOPY;
  private EmptyComplaints: boolean = false;
  private complaint = {
    title: ""
  }
  private url:string ="";
  private status:string = "";
  mouseover:boolean;
  

  private currentPage = 1;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private c: ComplaintService,
              private config: Configuration,              
              private commonService:ComplaintService) {
              this.url = this.router.url;
              this.route.params.subscribe(param =>{ 
                if(param['statusId']) this.complaintStatus = param['statusId'];
                if(param['categoryId']) this.complaintCategory = param['categoryId'];
              });
              switch (this.complaintStatus) {
                case '1':  this.status = "New";      break;
                case '2':  this.status = "Assigned"; break;
                case '3':  this.status = "InProgress";break;
                case '4':  this.status = "Closed";    break;
                case '5':  this.status = "Reopen";    break;
                case '6':  this.status = "Satisfied"; break;      
                default:   this.status = "All";       break;
              }
              this.fetchComplaints();
  }

  ngOnInit() {
    this.commonService.initArray();
    if(this.complaintStatus && this.complaintCategory)
      this.commonService.pushUrl(this.status+" Complaints", '/complaint/category-status/'+this.complaintCategory+'/'+this.complaintStatus);
    else if(this.complaintStatus)
      this.commonService.pushUrl(this.status+" Complaints", '/complaint/status/'+this.complaintStatus);
    else if(this.complaintCategory)
      this.commonService.pushUrl(this.status+" Complaints", '/complaint/category-status/category/'+this.complaintCategory); 
    else
      this.commonService.pushUrl(this.status+" Complaints", '/complaint');  
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

  ngAfterViewInit(){
    
  }

  
  fetchComplaints() {
    this.c.getComplaint(this.url, this.currentPage).then((res) => {
      if (res.status !== 204) {
        console.log(res);
        this.complaints = res;
        this.complaintsCOPY = res;
        this.EmptyComplaints = false;               
      } else {
        this.EmptyComplaints = true;
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
  complaintTitleOfCommentModel;
  currentUser = this.config.getUserId();
  getComplaintCommentById(complaintId){
    this.complaintIdOfCommentModel = complaintId;
    this.complaints.forEach(element => {
      if(element['id'] == complaintId)
        this.complaintTitleOfCommentModel = element.title;
    });

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

  clearComment(){
    delete this.comments;
  }
}


