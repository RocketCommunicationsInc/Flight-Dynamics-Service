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

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  seriesOneData(length: number) {
    for (let i = 0; i < length; i++) {
      const first = this.randomInt(150, 600);
      const second = this.randomInt(550, 900);
      this.seriesOne.push({ x: '', y: [first, second] });
    }
    return this.seriesOne;
  }

  seriesTwoData(length: number) {
    for (let i = 0; i < length; i++) {
      const first = this.randomInt(300, 800);
      const second = this.randomInt(1000, 1200);
      this.seriesTwo.push({ x: '', y: [first, second] });
    }
    return this.seriesTwo;
  }

  seriesThreeData(length: number) {
    for (let i = 0; i < length; i++) {
      const first = this.randomInt(50, 100);
      const second = this.randomInt(350, 500);
      this.seriesThree.push({ x: '', y: [first, second] });
    }
    return this.seriesThree;
  }

  seriesFourData(length: number) {
    for (let i = 0; i < length; i++) {
      const first = this.randomInt(0, 500);
      const second = this.randomInt(550, 1150);
      this.seriesFour.push({ x: '', y: [first, second] });
    }
    return this.seriesFour;
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
        data: this.seriesOneData(15),
        visible: true,
      },
      {
        name: 'Bravo',
        color: 'var(--color-data-visualization-2)',
        data: this.seriesTwoData(15),
        visible: true,
      },
      {
        name: 'Charlie',
        color: 'var(--color-data-visualization-3)',
        data: this.seriesThreeData(15),
        visible: true,
      },
      {
        name: 'Echo',
        color: 'var(--color-data-visualization-4)',
        data: this.seriesFourData(15),
        visible: true,
      },
    ],
    chart: {
      background: 'var(--color-background-base-default)',
      height: 475,
      type: 'rangeBar',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      lineCap: 'round',
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        'Feb 09',
        'Feb 11',
        'Feb 13',
        'Feb 15',
        'Feb 17',
        'Feb 19',
        'Feb 21',
        'Feb 23',
        'Feb 25',
        'Feb 27',
        'Feb 29',
        'Mar 02',
        'Mar 04',
        'Mar 06',
        'Mar 08',
      ],
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: 'var(--color-text-primary)',
      },
      labels: {
        formatter: function(label: string) {
          // return `<div class='labels'>${label}<br> 2023</div>`
        },
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
