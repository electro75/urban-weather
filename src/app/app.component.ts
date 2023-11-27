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
import { HttpClient } from '@angular/common/http';

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

  latestData : any = {}  

  @ViewChild("tempChart") tempChart: ChartComponent;
  @ViewChild("windChart") windChart: ChartComponent;
  @ViewChild("precChart") precChart: ChartComponent;
  public chartOptions: any;
  public tempChartOptions: any;
  public windChartOptions: any;
  public precChartOptions: any

  interval: any;
  displayType = 'Live';
  liveTempData: any = [];
  liveWindData: any = [];
  livePrecData: any = [];

  constructor(public fdb : Database, public __charts: ChartService, private http: HttpClient) {
    this.tempChartOptions = this.__charts.getChartOptions('Temperature', 'deg C')
    this.windChartOptions = this.__charts.getChartOptions('Wind Speed', 'km/hr', 0)
    this.precChartOptions = this.__charts.getChartOptions('Precipitation', '%', 0)
  }

  getProcessedData(data: any, val: string) {
    return Object.keys(data["current-data"]).map(dt => {
      return {
        x: dt,
        y: data["current-data"][dt][val]
      }
    })
  }

  processPreviousData(data: any) {
    console.log(data)
    data.date_time.forEach((dt: any, index: number) => {
      this.previousData.temp.push({
        x: dt,
        y: data.temp[index]
      })

      this.previousData.wind.push({
        x: dt,
        y: data.wind_speed[index]        
      })

      this.previousData.prec.push({
        x: dt,
        y: data.prec[index]
      })
    })
  }

  updateSuggestion(weatherData: any) {
    this.latestData = weatherData
  }

  previousData: any = {
    temp: [],
    wind: [],
    prec: []
  }
  isSuggestionUpdated = false;
  isPreviousDataStored = false;

  updateDisplay() {
    switch(this.displayType){
      case "Historic":
        this.tempChart.updateOptions({
          series: [{
            data: this.previousData.temp
          }]
        })

        this.windChart.updateOptions({
          series: [{
            data: this.previousData.wind
          }]
        })

        this.precChart.updateOptions({
          series: [{
            data: this.previousData.prec
          }]
        })
        
        break;
      
      case "Live":
        this.tempChart.updateOptions({
          series: [{
            data: this.liveTempData
          }]
        })
        this.windChart.updateOptions({
          series: [{
            data: this.liveWindData
          }]
        })

        this.precChart.updateOptions({
          series: [{
            data: this.livePrecData
          }]
        })
        break;
    }
    
  }

  ngOnInit(): void {

    const starCountRef = ref(this.fdb);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if(!this.isPreviousDataStored) {
        this.processPreviousData(data["weather-data"])
        this.isPreviousDataStored = true
      }
        
      this.liveTempData = this.getProcessedData(data, "temp")
      this.liveWindData = this.getProcessedData(data, "wind_speed")
      this.livePrecData = this.getProcessedData(data, "precipitation")

      this.tempChart.updateOptions({
        series: [{
          data: this.liveTempData
        }]
      })

      this.windChart.updateOptions({
        series:[{
          data: this.liveWindData
        }]
      })

      this.precChart.updateOptions({
        series:[{
          data : this.livePrecData
        }]
      })



      if(!this.isSuggestionUpdated) {
        this.updateSuggestion({
          temp: this.liveTempData[this.liveTempData.length - 1].y,
          wind: this.liveWindData[this.liveWindData.length - 1].y,
          prec: this.livePrecData[this.livePrecData.length - 1].y
        })
        this.isSuggestionUpdated = true;
      }
    });
  }

  ngOnDestroy(): void {
  }
}
