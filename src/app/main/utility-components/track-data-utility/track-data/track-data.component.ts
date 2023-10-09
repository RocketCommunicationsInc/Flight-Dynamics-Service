import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { dummyFileData } from '../dummy-file-data';
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
import { Files } from 'src/app/types/Files';
import { SitesComponent } from './sites/sites.component';
import { SettingsComponent } from './settings/settings.component';
import { CustomSegmentedButtonComponent } from 'src/app/shared/custom-segmented-button/custom-segmented-button.component';

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
  imports: [
    CommonModule,
    AstroComponentsModule,
    NgApexchartsModule,
    SitesComponent,
    SettingsComponent,
    CustomSegmentedButtonComponent,
  ],
  templateUrl: './track-data.component.html',
  styleUrls: ['./track-data.component.css'],
})
export class TrackDataComponent {
  @ViewChild(ChartComponent) chart?: ChartComponent;
  @ViewChild('legend') legend?: ElementRef;

  dummyFileData = dummyFileData;
  isSitesDrawerOpen: boolean = false;
  isSettingsDrawerOpen: boolean = false;
  showGraph: boolean = true;
  showTable: boolean = false;
  leftIcon = 'notes';
  leftText = 'Graph';
  rightIcon = 'show-chart';
  rightText = 'Table';
  leftBtnActive: boolean = true;
  rightBtnActive: boolean = false;

  shrinkChart() {
    this.chart?.updateOptions({
      chart: {
        width: '76%',
      },
    });
  }

  expandChart() {
    this.chart?.updateOptions({
      chart: {
        width: '100%',
      },
    });
  }

  openSitesDrawer() {
    const legendEl = this.legend?.nativeElement;
    this.shrinkChart();
    this.isSitesDrawerOpen = !this.isSitesDrawerOpen;
    legendEl.classList.add('legend-pushed');

    if (!this.isSitesDrawerOpen) {
      this.expandChart();
      legendEl.classList.remove('legend-pushed');
    }
  }

  openSettingsDrawer() {
    const legendEl = this.legend?.nativeElement;
    this.shrinkChart();
    this.isSettingsDrawerOpen = !this.isSettingsDrawerOpen;
    legendEl.classList.add('legend-pushed');

    if (!this.isSettingsDrawerOpen) {
      this.expandChart();
      legendEl.classList.remove('legend-pushed');
    }
  }

  viewTable() {
    this.showGraph = false;
    this.showTable = true;
    this.isSitesDrawerOpen = false;
    this.isSettingsDrawerOpen = false;
    this.rightBtnActive = true;
    this.leftBtnActive = false;
  }

  viewGraph() {
    this.showGraph = true;
    this.showTable = false;
    this.leftBtnActive = true;
    this.rightBtnActive = false;
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

  dummyFileSize: number[] = this.dummyFileData.map((file) => file.size);
  filteredLegendData: number[] = this.dummyFileSize;

  zoomLevel: number = 20;
  dummyDates = this.dummyFileData.map((file) => file.date.toLocaleDateString());
  labelsShown: any[] = this.dummyDates;

  dataPointLength: number = this.filteredLegendData.length;
  dataPointToDelete: number | null = null;
  deletedDataPoints: any[] | null = [];

  updateChartData(newData: any[]) {
    const updatedData = [
      {
        name: this.chartOptions.series[0].name,
        data: (this.chartOptions.series[0].data = newData),
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

  updateSlopeData(newData: any[]) {
    const updatedData = [
      {
        name: this.chartOptions.series[0].name,
        data: this.chartOptions.series[0].data,
        type: this.chartOptions.series[0].type,
      },
      {
        name: this.chartOptions.series[1].name,
        data: (this.chartOptions.series[1].data = newData),
        type: this.chartOptions.series[1].type,
      },
    ];
    this.chart?.updateSeries(updatedData);
  }

  selectedFilters: any[] = [];

  filterCheckboxes(event: any, filter: string) {
    const checkbox = event.target as HTMLRuxCheckboxElement;

    if (checkbox.checked) {
      this.selectedFilters.push(filter);
    } else {
      const index = this.selectedFilters.indexOf(filter);
      if (index !== -1) {
        this.selectedFilters.splice(index, 1);
      }
    }
    this.filteredLegendData = this.dummyFileSize.filter((size) => {
      return (
        this.selectedFilters.length === 0 ||
        this.selectedFilters.some((filter) => {
          if (filter === 'Az') {
            return size < 500;
          }
          if (filter === 'El') {
            return size < 1000 && size >= 500;
          }
          if (filter === 'Range') {
            return size > 1000;
          }
          return true;
        })
      );
    });
    this.dataPointLength = this.filteredLegendData.length;
    this.updateChartData(this.filteredLegendData);
  }

  onDelete() {
    if (this.dataPointToDelete !== null) {
      this.dummyFileData.filter((_, index) => index !== this.dataPointToDelete);

      //take the removed obj and put the value in to a deletePointsArray for undo btn
      const removedObj = dummyFileData.splice(this.dataPointToDelete, 1);
      const fileSize = removedObj.map((file) => file.size);
      this.deletedDataPoints?.push(fileSize.pop());

      //get the updated files for series data
      this.dummyFileSize = dummyFileData.map((file) => file.size);
      this.updateChartData(this.dummyFileSize);
      this.dataPointLength = this.dummyFileSize.length;

      this.dataPointToDelete = null;
      this.disableUndo = false;
    }
  }

  disableUndo: boolean = true;

  onUndo() {
    const lastValRemoved = this.deletedDataPoints?.pop();
    const deletedArr = (this.deletedDataPoints as number[]).length;
    if (Number(lastValRemoved)) {
      this.dummyFileSize.push(Number(lastValRemoved));
      if (deletedArr < 1) {
        this.disableUndo = true;
      }
    }
    this.updateChartData(this.dummyFileSize);
    this.dataPointLength = this.dummyFileSize.length;
  }

  updateSeriesOne(zoomLevel: number) {
    return this.dummyFileSize.slice(0, zoomLevel);
  }

  updateSeriesTwo(zoomLevel: number) {
    return this.slopeData.slice(0, zoomLevel);
  }

  handleZoom(event: any) {
    this.zoomLevel = event.target.value;
    this.labelsShown = this.dummyDates.slice(0, this.zoomLevel);

    //Update both series, categories, and labels on zoom
    this.updateChartData(this.updateSeriesOne(this.zoomLevel));
    this.updateSlopeData(this.updateSeriesTwo(this.zoomLevel));
    this.chart?.updateOptions({
      xaxis: {
        categories: this.labelsShown,
        tickAmount: this.labelsShown.length,
      },
    });
  }

  chartOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: 'Main',
        data: this.filteredLegendData,
        type: 'scatter',
      },
      {
        name: 'Slope',
        data: this.slopeData,
        type: 'line',
        color: 'var(--color-data-visualization-3)',
      },
    ],
    chart: {
      height: 425,
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
            (file) => file.size === config?.dataPointIndex
          );
          //Change the color of selected data point
          const dataPoints = document.querySelectorAll('.apexcharts-marker');
          dataPoints.forEach((el) => {
            el.classList.remove('selected-data-point');
            el.classList.add('data-point-hover');
          });
          dataPoints[config.dataPointIndex].classList.add(
            'selected-data-point'
          );
        },
      },
    },
    dataLabels: {
      style: {
        cssClass: 'data-points',
      },
    },
    legend: {
      show: false,
    },
    markers: {
      size: [6, 0],
      colors: 'var(--color-data-visualization-2)',
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      categories: this.labelsShown,
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
          file.date.toLocaleDateString()
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
