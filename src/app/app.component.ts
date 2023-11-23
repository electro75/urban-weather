import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// export class AppComponent implements OnInit {
//   title = 'urban-weather';

//   constructor(public fdb: Database) {

//   }


// }
export class AppComponent {
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

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: any;

  constructor(public fdb : Database) {
    this.chartOptions = {
      series: [
        {
          name: "Likes",
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }
      ],
      chart: {
        // height: 350,
        width: 400,
        type: "line"
      },
      stroke: {
        width: 7,
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "1/11/2000",
          "2/11/2000",
          "3/11/2000",
          "4/11/2000",
          "5/11/2000",
          "6/11/2000",
          "7/11/2000",
          "8/11/2000",
          "9/11/2000",
          "10/11/2000",
          "11/11/2000",
          "12/11/2000",
          "1/11/2001",
          "2/11/2001",
          "3/11/2001",
          "4/11/2001",
          "5/11/2001",
          "6/11/2001"
        ]
      },
      title: {
        text: "Social Media",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "vertical",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      // markers: {
      //   size: 4,
      //   colors: ["#FFA41B"],
      //   strokeColors: "#fff",
      //   strokeWidth: 2,
      //   hover: {
      //     size: 7
      //   }
      // },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: "Engagement"
        }
      }
    };    
  }

    ngOnInit(): void {

      const starCountRef = ref(this.fdb);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
      });

      setTimeout(() => {
        this.chart.updateSeries([{
          data: [15, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }])
      }, 5000)
      
    // use chart js to visualize data
    // get current temp to show outfit choices?
    // get location of the user
  }
}
