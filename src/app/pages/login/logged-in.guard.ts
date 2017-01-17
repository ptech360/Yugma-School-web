import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Configuration } from '../../services/app.constant';
import { UserService } from '../../services/user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private user: UserService,
              private config: Configuration,
              private router: Router) {

  }

  canActivate() {
    let IsLoggedIn = this.user.isLoggedIn();
    if (IsLoggedIn) {
      this.config.buildUrl();
    }
    return this.user.isLoggedIn();
  }

}
