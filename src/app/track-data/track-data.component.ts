import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
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
} from 'ng-apexcharts';
import { Files } from '../types/Files';
import { ChangeDetectorRef } from '@angular/core';
import * as ApexCharts from 'apexcharts';

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
export class TrackDataComponent implements AfterViewInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
  ) {}
  private chart: ApexChart | any;

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  // ngOnInit(): void {
  //   this.initializeChart()
  // }

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
  deletedDataPoints: number[] | null = [];

  initializeChart() {
    // const chartEl = document.querySelector('#chart');
    const chartEl = this.el.nativeElement.querySelector('#chart');
    console.log(chartEl);

    if (chartEl) {
      this.chart = new ApexCharts(chartEl, this.chartOptions);
      this.chart.render();
    }
  }

  updateChartData(newData: any[]) {
    if (this.chart) {
      // newData = this.chartOptions.series[0].data

      this.chartOptions.series[0].data = newData;

      this.chart.updateSeries(this.chartOptions.series);
      // this.chart.updateSeries([{ data: newData }]);
      console.log(this.chartOptions.series[0].data, 'new');
      this.cdr.detectChanges();
    }
  }

  onDelete() {
    if (this.dataPointToDelete !== null) {
      dummyFileData.splice(this.dataPointToDelete, 1);

      this.dummyFileSize = dummyFileData.map((file) => file.size);
      const newData = [...this.dummyFileSize];
      this.updateChartData(this.dummyFileSize);

      this.deletedDataPoints?.push(this.dataPointToDelete);
      this.dataPointToDelete = null;
    }
  }

  onUndo() {
    const lastValRemoved = this.deletedDataPoints?.slice(-1)[0];
    this.dummyFileSize.push(lastValRemoved as number);
    this.updateChartData(this.dummyFileSize);
  }

  chartOptions: Partial<ChartOptions> | any = {
    series: [
      {
        data: this.dummyFileSize,
        type: 'scatter',
      },
      {
        name: 'Slope Line',
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
