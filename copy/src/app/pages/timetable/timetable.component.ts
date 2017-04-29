import {Component} from '@angular/core';
declare let $;
@Component({
  selector:'timetable',
  template:`<div class="row">
              <div class="col s12">
                <ul class="tabs">
                  <li class="tab col s6"><a class="active" routerLink="/timetable/view-timetable" routerLinkActive="active">View Timetable</a></li>
                  <li class="tab col s6"><a routerLink="/timetable/create-timetable" routerLinkActive="active">Create Timetable</a></li>
                </ul>
              </div>
            </div>
            <router-outlet></router-outlet>`
})
export class Timetable{
}