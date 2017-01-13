import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

declare var $;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styles: [`
    .tb-grey {
      background-color: #424242 !important;
    }
    `]
})
export class AppComponent implements AfterViewInit {

  constructor() {
  }

  ngAfterViewInit() {
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    });
  }


}
