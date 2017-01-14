import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { GithubService } from './github/shared/github.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ComplaintComponent } from './complaints/complaint.component';
import { HomeComponent } from './home/home.component';
import { RepoBrowserComponent } from './github/repo-browser/repo-browser.component';
import { RepoListComponent } from './github/repo-list/repo-list.component';
import { RepoDetailComponent } from './github/repo-detail/repo-detail.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ContactComponent } from './contact/contact.component';

// custom component
import { GoogleChart } from './customComponent/chart.directive';
import { LoginComponent } from './login/login.component';
import { ParentComponent } from './login/parent'
import { ForgetPasswordComponent } from './login/forget.password.component';

// import service
import { ChartService } from './services/chart.service';
import { UserService } from './services/user.service';
import { LoggedInGuard } from './login/logged-in.guard';
import { Configuration } from './services/app.constant';

@NgModule({
  declarations: [
    GoogleChart,
    AppComponent,
    ComplaintComponent,
    RepoBrowserComponent,
    RepoListComponent,
    RepoDetailComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ParentComponent
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
    Configuration
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
