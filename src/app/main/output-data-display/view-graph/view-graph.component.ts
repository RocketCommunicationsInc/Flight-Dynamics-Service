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
import { OutputDataDisplayService } from '../output-data-display.service';

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
export class ViewGraphComponent {
  @ViewChild(ChartComponent) chart?: ChartComponent;

  constructor(public outputDataDisplayService: OutputDataDisplayService) {}

  property = this.outputDataDisplayService.data.map((state) => state.property);

  initialState = this.outputDataDisplayService.data.map(
    (state) => state.initial
  );

  finalState = this.outputDataDisplayService.data.map((state) => state.final);

  newDataArr = this.initialState.map((initial, index) => [
    initial,
    this.finalState[index],
  ]);

  barData = this.newDataArr.map((yData, index) => ({
    x: index + ' data',
    y: yData,
    fill: 'red',
    // fillColor: 'green',
    colors: ['red', 'green'],
    //  color: 'purple'
  }));

  chartOptions: Partial<ChartOptions> | any = {
    series: [{ data: this.barData }],
    plotOptions: {
      bar: {
        horizontal: false,
        distributed: true,
        background: '#293450',
        // style: {
        colors: [
          'var(--color-data-visualization-1)',
          'var(--color-data-visualization-2)',
          'var(--color-data-visualization-3)',
          'var(--color-data-visualization-4)',
        ],
        // }
      },
    },

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
    colors: [
      'var(--color-data-visualization-1)',
      'var(--color-data-visualization-2)',
      'var(--color-data-visualization-3)',
      'var(--color-data-visualization-4)',
    ],
    // fill: {
    //   colors: ['#F44336', '#E91E63', '#9C27B0'],
    // },
    fill: {
      type: 'solid',
      opacity: 0.6,
      colors: ['#F44336', '#E91E63', '#9C27B0'],
    },
    stroke: {
      lineCap: 'round',
    },
    //   dataLabels: {
    //     style: {
    //       colors: ['#F44336', '#E91E63', '#9C27B0']
    //     }
    //   },
    //   markers: {
    //     colors: ['#F44336', '#E91E63', '#9C27B0']
    //  },
    // theme: {
    //   enabled: true
    // },
    legend: {
      show: false,
    },
    xaxis: {
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
