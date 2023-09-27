import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
  ApexMarkers,
  ApexStroke,
  ApexTooltip,
  ApexOptions,
  ChartComponent,
} from 'ng-apexcharts';

type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  markers: ApexMarkers | any;
  stroke: ApexStroke | any;
  legend: ApexOptions | any;
  tooltip: ApexTooltip | any;
};

@Component({
  selector: 'fds-view-graph',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './view-graph.component.html',
  styleUrls: ['./view-graph.component.css'],
})
export class ViewGraphComponent implements AfterViewInit {
  @ViewChild(ChartComponent) chart?: ChartComponent;

  barChart = document.querySelector("#chart .apexcharts-bar-series .apexcharts[data-x='TEAM A']")?.classList.add('rangebar')
  ngAfterViewInit(): void {
    console.log(this.barChart, "barChart")
    // if(this.chart) {
    //   this.chart.updateSeries(this.chartOptions.series)
    // }
  }


  chartOptions: Partial<ChartOptions> | any = {
    series: [
      {
        data: [
          {
            x: 'One',
            y: [65, 96],
          },
          {
            x: 'Two',
            y: [55, 78],
            colors: [
              'var(--color-data-visualization-1)',
              'var(--color-data-visualization-2)',
              'var(--color-data-visualization-3)',
              'var(--color-data-visualization-4)',
            ],
          },
          {
            x: 'Three',
            y: [95, 186],
            colors: [
              'var(--color-data-visualization-4)',
            ],
          },
        ],
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        // style: {
        //   cssClass: 'apexcharts-rangebar',
        // },
      },
    },
    colors: [
      'var(--color-data-visualization-1)',
      'var(--color-data-visualization-2)',
      'var(--color-data-visualization-3)',
      'var(--color-data-visualization-4)',
    ],
    chart: {
      height: 500,
      type: 'rangeBar',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [''],
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: 'var(--color-text-primary)',
      },
      labels: {
        enabled: true,
        show: true,
        style: {
          colors: 'var(--color-text-primary)',
        },
      },
      title: 'test',
    },
    tooltip: {
      enabled: false,
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: 'var(--color-text-primary)',
        },
        labels: {
          enabled: true,
          show: true,
          style: {
            colors: 'var(--color-text-primary)',
          },
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,
          color: 'var(--color-text-primary)',
        },
        labels: {
          show: false,
        },
      },
    ],
  };
}
