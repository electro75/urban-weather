import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { getDatabase, ref, onValue, Database } from '@angular/fire/database';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis
} from "ng-apexcharts";
import { ChartService } from './chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  ChartOptions : {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    fill: ApexFill;
    markers: ApexMarkers;
    yaxis: ApexYAxis;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
  };

  @ViewChild("tempChart") tempChart: ChartComponent;
  @ViewChild("windChart") windChart: ChartComponent;
  @ViewChild("precChart") precChart: ChartComponent;
  public chartOptions: any;
  public tempChartOptions: any;
  public windChartOptions: any;
  public precChartOptions: any

  interval: any;
  displayType = 'Live';

  constructor(public fdb : Database, public __charts: ChartService) {
    this.tempChartOptions = this.__charts.getChartOptions('Temperature', 'deg C')
    this.windChartOptions = this.__charts.getChartOptions('Wind Speed', 'km/hr', 0)
    this.precChartOptions = this.__charts.getChartOptions('Precipitation', 'mm', 0)
  }

  getProcessedData(data: any, val: string) {
    return Object.keys(data["current-data"]).map(dt => {
      return {
        x: dt,
        y: data["current-data"][dt][val]
      }
    })
  }

  ngOnInit(): void {

    const starCountRef = ref(this.fdb);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      // get keys from current data
      let updateTempData = this.getProcessedData(data, "temp")
      let updateWindData = this.getProcessedData(data, "wind_speed")
      let updatePrecData = this.getProcessedData(data, "precipitation")
      this.tempChart.updateOptions({
        series: [{
          data: updateTempData
        }]
      })

      this.windChart.updateOptions({
        series:[{
          data: updateWindData
        }]
      })

      this.precChart.updateOptions({
        series:[{
          data : updatePrecData
        }]
      })
    });
  }

  ngOnDestroy(): void {
  }
}
