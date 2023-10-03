import { Component, ViewChild } from '@angular/core';
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
import { AstroComponentsModule } from '@astrouxds/angular';
import { randomNum } from 'src/app/mock-data/generate-data';

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
  selector: 'fds-solution-graph',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, AstroComponentsModule],
  templateUrl: './solution-graph.component.html',
  styleUrls: ['./solution-graph.component.css'],
})
export class SolutionGraphComponent {
  @ViewChild(ChartComponent) chart?: ChartComponent;

  seriesOne: { x: string; y: number[] }[] = [];
  seriesTwo: { x: string; y: number[] }[] = [];
  seriesThree: { x: string; y: number[] }[] = [];
  seriesFour: { x: string; y: number[] }[] = [];

  randomInt = randomNum;

  seriesData(
    num1: number,
    num2: number,
    num3: number,
    num4: number,
    series: any
  ) {
    for (let i = 0; i < 15; i++) {
      const first = this.randomInt(num1, num2);
      const second = this.randomInt(num3, num4);
      series.push({ x: '', y: [first, second] });
    }
    return series;
  }

  handleLegend(index: number) {
    const series = this.chartOptions.series[index];
    series.visible = !series.visible;

    const updatedSeries = this.chartOptions.series.filter(
      (data: any) => data.visible
    );
    this.chart?.updateSeries(updatedSeries);
  }

  chartOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: 'Alpha',
        color: 'var(--color-data-visualization-1)',
        data: this.seriesData(50, 100, 80, 500, this.seriesOne),
        visible: true,
      },
      {
        name: 'Bravo',
        color: 'var(--color-data-visualization-2)',
        data: this.seriesData(0, 200, 175, 400, this.seriesTwo),
        visible: true,
      },
      {
        name: 'Charlie',
        color: 'var(--color-data-visualization-3)',
        data: this.seriesData(100, 400, 450, 800, this.seriesThree),
        visible: true,
      },
      {
        name: 'Echo',
        color: 'var(--color-data-visualization-5)',
        data: this.seriesData(700, 750, 800, 1200, this.seriesFour),
        visible: true,
      },
    ],
    chart: {
      background: 'var(--color-background-base-default)',
      height: 450,
      type: 'rangeBar',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      colors: ['transparent'],
      width: 5.5,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        ['Feb 09', 2023],
        ['Feb 11', 2023],
        ['Feb 13', 2023],
        ['Feb 15', 2023],
        ['Feb 17', 2023],
        ['Feb 19', 2023],
        ['Feb 21', 2023],
        ['Feb 23', 2023],
        ['Feb 25', 2023],
        ['Feb 27', 2023],
        ['Feb 29', 2023],
        ['Mar 02', 2023],
        ['Mar 04', 2023],
        ['Mar 06', 2023],
        ['Mar 08', 2023],
      ],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: true,
        color: 'var(--color-text-primary)',
      },
      labels: {
        style: {
          colors: 'var(--color-text-primary)',
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    yaxis: [
      {
        tickAmount: 12,
        decimalsInFloat: 0,
        min: 0,
        max: 1200,
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
