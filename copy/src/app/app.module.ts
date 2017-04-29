import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ComplaintComponent } from './pages/complaints/complaint';
import { ComplaintListComponent } from './pages/complaints/complaint.list.component';
import { HomeComponent } from './pages/home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AccountComponent } from './pages/account/account.component';

// custom component
import { GoogleChart } from './customComponent/chart.directive';
import { LoginComponent } from './pages/login/login.component';
import { ParentComponent } from './pages/login/parent'
import { ForgetPasswordComponent } from './pages/login/forget.password.component';
import { CustomLoader } from './customComponent/loader.component';
import { EditComplaint } from './pages/complaints/complaint.edit.component';
import { AddStaffComponent } from './pages/addStaff/addStaff.component';
import { AddStudentComponent } from './pages/addStudent/addStudent.component';
import { UploadComponent } from './pages/upload/upload.component';
import { Timetable } from './pages/timetable/timetable.component';
import { ViewTimetable} from './pages/timetable/timetable.view';
import { CreateTimetable} from './pages/timetable/timetable.create';
import { Ng2TableModule } from 'ng2-table/ng2-table';
 
// import service
import { ChartService } from './services/chart.service';
import { UserService } from './services/user.service';
import { LoggedInGuard } from './pages/login/logged-in.guard';
import { Configuration } from './services/app.constant';
import { ComplaintService } from './services/complaint.service';
import { AdminService } from './services/admin.service';
import { ValidationService } from './services/formValidation.service';
import { CommonService } from './services/common.service';
 
@NgModule({
  declarations: [
    EditComplaint,
    GoogleChart,
    AppComponent,
    ComplaintComponent,
    ComplaintListComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ParentComponent,
    CustomLoader,
    AddStaffComponent,
    AddStudentComponent,
    UploadComponent,
    Timetable,
    ViewTimetable,
    CreateTimetable,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2TableModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    ChartService,
    UserService,
    LoggedInGuard,
    Configuration,
    ComplaintService,
    AdminService,
    ValidationService,
    CommonService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
