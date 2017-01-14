import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'parnet',
  styleUrls: ['./login.component.css'],
  template: `
    <nav>
      <a [routerLink]="['login']">Login</a>
      <a [routerLink]="['forget-password']">Forget</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class ParentComponent {



}
