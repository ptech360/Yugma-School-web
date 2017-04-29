import { Routes } from '@angular/router';

import { EditComplaint } from './pages/complaints/complaint.edit.component';
import { ComplaintComponent } from './pages/complaints/complaint';
import { ComplaintListComponent } from './pages/complaints/complaint.list.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { ParentComponent } from './pages/login/parent'
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/login/forget.password.component';
import { LoggedInGuard } from './pages/login/logged-in.guard';
import { AddStaffComponent } from './pages/addStaff/addStaff.component';
import { AddStudentComponent } from './pages/addStudent/addStudent.component';
import { UploadComponent } from './pages/upload/upload.component';
import { Timetable} from './pages/timetable/timetable.component';
import { ViewTimetable} from './pages/timetable/timetable.view';
import { CreateTimetable} from './pages/timetable/timetable.create';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'parent/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'complaint', component: ComplaintComponent, canActivate: [LoggedInGuard],
    children: [
      { path: '', component: ComplaintListComponent, pathMatch: 'full'},
      { path: 'status/:statusId', component: ComplaintListComponent, pathMatch: 'full'},
      { path: 'category-status/category/:categoryId', component: ComplaintListComponent, pathMatch: 'full'},
      { path: 'category-status/:categoryId/:statusId', component: ComplaintListComponent, pathMatch: 'full'},
      { path: 'edit/:complaint', component: EditComplaint}
    ]
  },
  { path: 'add-staff', component: AddStaffComponent, canActivate: [LoggedInGuard] },
  { path: 'add-student', component: AddStudentComponent, canActivate: [LoggedInGuard] },
  { path: 'upload-file', component: UploadComponent, canActivate: [LoggedInGuard] },
  { path: 'timetable', component: Timetable, canActivate: [LoggedInGuard] ,
    children: [
      {path:'',component:ViewTimetable, pathMatch: 'full'},
      {path:'view-timetable',component:ViewTimetable, pathMatch: 'full'},
      {path:'create-timetable',component:CreateTimetable, pathMatch: 'full'},
    ]
  },
  { path: 'parent', component: ParentComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forget-password', component: ForgetPasswordComponent }
    ]
  },
  { path: 'account', component: AccountComponent },
];
