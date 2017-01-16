import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../services/user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}

  canActivate() {
    console.log("AAAAAA", this.user.isLoggedIn())
    return this.user.isLoggedIn();
  }

}
