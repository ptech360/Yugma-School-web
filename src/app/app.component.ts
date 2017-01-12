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

  @ViewChild('selectElem') el:ElementRef;

  constructor() {

  }

  ngAfterViewInit() {
    $(this.el.nativeElement).sideNav({draggable: true,closeOnClick: true});
  }


}
