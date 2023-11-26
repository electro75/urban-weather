import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  getChartOptions(chartTitle: string, ylable: string, minVal = -5) {
    return {
      series: [
        {
          name: chartTitle,
          data: [0,0,0,0]
        }
      ],
      chart: {
        // height: 350,
        width: 400,
        type: "line"
      },
      stroke: {
        width: 2,
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: []
      },
      title: {
        text: chartTitle,
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666"
        }
      },
      yaxis: {
        min:minVal,
        max: 40,
        title: {
          text: ylable
        }
      }
    }
  }
}
