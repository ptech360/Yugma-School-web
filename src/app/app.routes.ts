import { Routes } from '@angular/router';

import { EditComplaint } from './pages/complaints/complaint.edit.component';
import { ComplaintComponent } from './pages/complaints/complaint';
import { ComplaintListComponent } from './pages/complaints/complaint.list.component';
import { HomeComponent } from './pages/home/home.component';
import { RepoBrowserComponent } from './pages/github/repo-browser/repo-browser.component';
import { RepoListComponent } from './pages/github/repo-list/repo-list.component';
import { RepoDetailComponent } from './pages/github/repo-detail/repo-detail.component';
import { AccountComponent } from './pages/account/account.component';
import { ParentComponent } from './pages/login/parent'
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/login/forget.password.component';
import { LoggedInGuard } from './pages/login/logged-in.guard';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'parent/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'complaints', component: ComplaintComponent, canActivate: [LoggedInGuard],
    children: [
      { path: 'list', component: ComplaintListComponent, pathMatch: 'full'},
      { path: 'edit', component: EditComplaint}
    ]
  },
  { path: 'parent', component: ParentComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forget-password', component: ForgetPasswordComponent }
    ]
  },
  { path: 'github', component: RepoBrowserComponent,
    children: [
      { path: '', component: RepoListComponent },
      { path: ':org', component: RepoListComponent,
        children: [
          { path: '', component: RepoDetailComponent },
          { path: ':repo', component: RepoDetailComponent }
        ]
      }]
  },
  { path: 'account', component: AccountComponent }
];
