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
import { PerformanceData } from '../output-data-display.model';
import { TableService } from 'src/app/shared/table.service';

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
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './solution-graph.component.html',
  styleUrls: ['./solution-graph.component.css'],
})
export class SolutionGraphComponent {
  @ViewChild(ChartComponent) chart?: ChartComponent;
  // @Input() data: PerformanceData[] = [];

  constructor(public outputDataDisplayService: OutputDataDisplayService) {
    console.log(this.seriesTwoData)
  }

  property = this.outputDataDisplayService.solutionData.map(
    (state) => state.property
  );

  initialState = this.outputDataDisplayService.solutionData.map(
    (state) => state.initial
  );

  finalState = this.outputDataDisplayService.solutionData.map(
    (state) => state.final
  );

  seriesOne = this.initialState.map((initial, index) => [
    initial,
    this.finalState[index],
  ]);

  seriesTwo = this.initialState.map((initial, index) => [
    initial - 500,
    this.finalState[index] - 125,
  ]);

  seriesThree = this.initialState.map((initial, index) => [
    initial - 50,
    this.finalState[index] - 10,
  ]);

  seriesOneData = this.seriesOne.map((data) => ({
    x: data,
    y: data,
    fill: 'red',
    // fillColor: 'green',
    colors: ['red', 'green'],
    //  color: 'purple'
  }));

  seriesTwoData = this.seriesTwo.map((data) => ({
    x: data,
    y: data,
    fill: 'red',
    // fillColor: 'green',
    colors: ['red', 'green'],
    //  color: 'purple'
  }));

  seriesThreeData = this.seriesThree.map((data) => ({
    x: data,
    y: data,
    fill: 'red',
    // fillColor: 'green',
    colors: ['red', 'green'],
    //  color: 'purple'
  }));

  chartOptions: Partial<ChartOptions> | any = {
    series: [
      { data: this.seriesOneData },
      { data: this.seriesTwoData },
       //{ data: this.seriesOneData },
      // { data: this.seriesTwoData },
    //  { data: [{
    //     x: '',
    //     y: [65, 96]
    //   },
    //   {
    //     x: '',
    //     y: [55, 78]
    //   },
    //   {
    //     x: '',
    //     y: [95, 186]
    //   }]},
    //   { data: [{
    //     x: '',
    //     y: [65, 96]
    //   },
    //   {
    //     x: '',
    //     y: [55, 78]
    //   },
    //   {
    //     x: '',
    //     y: [95, 186]
    //   }]},
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        distributed: true,
        //background: '#293450',
        // style: {
        // colors: [
        //   'var(--color-data-visualization-1)',
        //   'var(--color-data-visualization-2)',
        //   'var(--color-data-visualization-3)',
        //   'var(--color-data-visualization-4)',
        // ],
        colors: [
          'purple',
          'orange',
          'yellow',
          'red',
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
    // colors: [
    //   'var(--color-data-visualization-1)',
    //   'var(--color-data-visualization-2)',
    //   'var(--color-data-visualization-3)',
    //   'var(--color-data-visualization-4)',
    // ],
    colors: [
      'purple',
      'orange',
      'yellow',
      'red',
    ],
    // fill: {
    //   colors: ['#F44336', '#E91E63', '#9C27B0'],
    // },
    fill: {
      type: 'solid',
      opacity: 0.6,
      colors: [
        'purple',
        'orange',
        'yellow',
        'red',
      ],
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
        //show: true,
      },
      axisBorder: {
        show: true,
        color: 'var(--color-text-primary)',
      },
      labels: {
        //enabled: true,
        //show: true,
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
