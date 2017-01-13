import { Component, Directive, Input, ElementRef } from '@angular/core';

declare var google:any;
declare var googleLoaded:any;

@Directive({
  selector: '[GoogleChart]'
})

export class GoogleChart {

  public _element:any;

  @Input('chartType') public chartType;
  @Input('chartOptions') public chartOptions: Object;
  // @Input('chartData') public chartData: Object;

  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }

  ngOnInit() {
    google.charts.load('current', {'packages':['corechart']});
  }

  @Input() set chartData(data) {
    setTimeout(() => {
      this.drawGraph(this.chartOptions, this.chartType, data,  this._element);
    }, 2000);
  }

  drawGraph (chartOptions,chartType,chartData,ele) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var wrapper;
      wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        dataTable:chartData ,
        options: chartOptions || {},
        containerId: ele.id
      });
      wrapper.draw();
      google.visualization.events.addListener(wrapper, 'select', selectHandler);

      function selectHandler() {
        let selectedRow = wrapper.getChart().getSelection()[0].row;
        console.log("DSAD", wrapper.getDataTable().getValue(selectedRow, 2));
      }
    }
  }

}
