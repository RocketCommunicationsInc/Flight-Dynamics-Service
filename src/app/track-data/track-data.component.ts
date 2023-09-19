import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { dummyFileData } from '../track-files/dummy-file-data';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexMarkers,
  ApexStroke,
} from 'ng-apexcharts';

type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  title: ApexTitleSubtitle | any;
  markers: ApexMarkers | any;
  stroke: ApexStroke | any;
  legend: any;
};

@Component({
  selector: 'fds-track-data',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, NgApexchartsModule],
  templateUrl: './track-data.component.html',
  styleUrls: ['./track-data.component.css'],
})
export class TrackDataComponent {
  public chartOptions: Partial<ChartOptions>;
  dummyFileData = dummyFileData;

  segmentedBtnData = [
    { label: 'View Graph', selected: true },
    { label: 'View Table' },
  ];

  constructor() {
    const dummyDates = dummyFileData.map((file) =>
      file.date.toLocaleDateString(),
    );

    const dummyFileSize = dummyFileData.map((file) => file.size);

    this.chartOptions = {
      series: [
        {
          data: dummyFileSize,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      title: {
        // text: 'My First Angular Chart',
      },
      markers: {
        size: 5,
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        categories: dummyDates,
        axisTicks: {
          show: false,
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
      yaxis: [
        {
          title: {
            text: 'Az/EI (degrees)',
            style: {
              color: 'var(--color-text-primary)',
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: true,
            color: 'var(--color-text-primary)',
          },
          labels: {
            // formatter: function (value: number) {
            //   return value + '%';
            // },
            enabled: true,
            show: true,
            style: {
              colors: 'var(--color-text-primary)',
            },
          },
        },
        {
          opposite: true,
          title: {
            text: 'Range (km)',
            style: {
              color: 'var(--color-text-primary)',
            },
          },
          axisTicks: {
            show: false,
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
      ],
    };
  }
}
