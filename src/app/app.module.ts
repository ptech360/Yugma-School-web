import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { GithubService } from './pages/github/shared/github.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ComplaintComponent } from './pages/complaints/complaint';
import { ComplaintListComponent } from './pages/complaints/complaint.list.component';
import { HomeComponent } from './pages/home/home.component';
import { RepoBrowserComponent } from './pages/github/repo-browser/repo-browser.component';
import { RepoListComponent } from './pages/github/repo-list/repo-list.component';
import { RepoDetailComponent } from './pages/github/repo-detail/repo-detail.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AccountComponent } from './pages/account/account.component';

// custom component
import { GoogleChart } from './customComponent/chart.directive';
import { LoginComponent } from './pages/login/login.component';
import { ParentComponent } from './pages/login/parent'
import { ForgetPasswordComponent } from './pages/login/forget.password.component';
import { CustomLoader } from './customComponent/loader.component';
import { EditComplaint } from './pages/complaints/complaint.edit.component';

// import service
import { ChartService } from './services/chart.service';
import { UserService } from './services/user.service';
import { LoggedInGuard } from './pages/login/logged-in.guard';
import { Configuration } from './services/app.constant';
import { ComplaintService } from './services/complaint.service';

@NgModule({
  declarations: [
    EditComplaint,
    GoogleChart,
    AppComponent,
    ComplaintComponent,
    ComplaintListComponent,
    RepoBrowserComponent,
    RepoListComponent,
    RepoDetailComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ParentComponent,
    CustomLoader
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    GithubService,
    ChartService,
    UserService,
    LoggedInGuard,
    Configuration,
    ComplaintService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
