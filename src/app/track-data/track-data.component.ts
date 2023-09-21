import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { dummyFileData } from '../track-files/dummy-file-data';
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
import { Files } from '../types/Files';

type Sort = 'ASC' | 'DESC' | '';

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
  selector: 'fds-track-data',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, NgApexchartsModule],
  templateUrl: './track-data.component.html',
  styleUrls: ['./track-data.component.css'],
})
export class TrackDataComponent {
  @ViewChild(ChartComponent) chart?: ChartComponent;

  dummyFileData = dummyFileData;

  showGraph: boolean = true;
  showTable: boolean = false;

  viewTable() {
    this.showGraph = false;
    this.showTable = true;
  }

  viewGraph() {
    this.showGraph = true;
    this.showTable = false;
  }

  filteredData: Files[] = this.dummyFileData;
  sortDirection: Sort = 'ASC';
  sortedColumn: string = '';
  showIcon: boolean = false;
  showSecondIcon: boolean = false;

  sortColumn(column: string) {
    if (column === this.sortedColumn) {
      if (column === 'date') {
        this.showIcon = !this.showIcon;
      }
      if (column === 'size') {
        this.showSecondIcon = !this.showSecondIcon;
      }
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'ASC';
    }
    this.filteredData.sort((a: any, b: any) => {
      return this.sortDirection === 'ASC'
        ? a[this.sortedColumn] - b[this.sortedColumn]
        : b[this.sortedColumn] - a[this.sortedColumn];
    });
  }

  slopeData = [
    [800, 825],
    [815, 850],
    [840, 875],
    [865, 900],
    [895, 925],
    [915, 950],
    [940, 975],
    [965, 1000],
    [990, 1050],
    [1040, 1100],
    [1090, 1150],
    [1150, 1200],
    [1200, 1300],
    [1300, 1400],
    [1400, 1550],
    [1490, 1650],
    [1590, 1800],
  ];

  dummyFileSize: number[] = dummyFileData.map((file) => file.size);
  dummyDates = dummyFileData.map((file) => file.date.toLocaleDateString());

  dataPointLength: number = this.dummyFileSize.length;
  dataPointToDelete: number | null = null;
  deletedDataPoints: any[] | null = [];

  updateChartData(newData: any[]) {
    const updatedData = [
      {
        name: this.chartOptions.series[0].name,
        data: (this.chartOptions.series[0].data = newData),
        //data: newData,
        type: this.chartOptions.series[0].type,
      },
      {
        name: this.chartOptions.series[1].name,
        data: this.chartOptions.series[1].data,
        type: this.chartOptions.series[1].type,
      },
    ];
    this.chart?.updateSeries(updatedData);
  }

  onDelete() {
    if (this.dataPointToDelete !== null) {
      dummyFileData.splice(this.dataPointToDelete, 1);

      const removedObj = dummyFileData.splice(this.dataPointToDelete, 1);
      const fileSize = removedObj.map((file) => file.size);
      this.deletedDataPoints?.push(fileSize.pop());
      console.log(removedObj, 'deleted arr');

      this.dummyFileSize = dummyFileData.map((file) => file.size);
      this.updateChartData(this.dummyFileSize);

      this.dataPointToDelete = null;
    }
  }

  disableUndo: boolean = true;

  onUndo() {
    const lastValRemoved = this.deletedDataPoints?.pop();
    if (Number(lastValRemoved)) {
      this.dummyFileSize.push(Number(lastValRemoved));
    }

    // if(this.deletedDataPoints !== null && this.deletedDataPoints?.length > 0) {
    //   this.disableUndo = false
    // }
    this.updateChartData(this.dummyFileSize);
  }

  chartOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: 'Main',
        data: this.dummyFileSize,
        type: 'scatter',
      },
      {
        name: 'Slope',
        data: this.slopeData,
        type: 'line',
      },
    ],
    chart: {
      height: 450,
      type: 'line',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          this.dataPointToDelete = dummyFileData.findIndex(
            (file) => file.index === config?.dataPointIndex,
          );
        },
      },
    },
    legend: {
      show: false,
    },
    markers: {
      size: [5, 0],
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      categories: this.dummyDates,
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
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      theme: '',
      custom: function ({ series, seriesIndex, dataPointIndex }: any) {
        const dummyDates = dummyFileData.map((file) =>
          file.date.toLocaleDateString(),
        );
        return (
          '<div class="tooltip-box">' +
          '<span> DGS' +
          '</span> <br/>' +
          '<span> ' +
          dummyDates[dataPointIndex] +
          '</span> <br/>' +
          '<span>El: ' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
      },
      fillSeriesColor: true,
      style: {
        color: 'var(--color-text-primary)',
        background: 'var(--color-background-base-default)',
      },
      shared: false,
      intersect: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      marker: {
        show: false,
      },
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
