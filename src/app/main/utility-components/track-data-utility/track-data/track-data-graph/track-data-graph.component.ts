import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import {
  ApexAxisChartSeries,
  NgApexchartsModule,
  ChartComponent,
} from 'ng-apexcharts';
import { SitesComponent } from '../sites/sites.component';
import { SettingsComponent } from '../settings/settings.component';
import type { TrackFile } from 'src/app/types/data.types';
import {
  TableData,
  TrackFilesDataUtilityService,
} from '../../track-files-data.service';
import { ChartOptions, getChartOptions, getSeries } from './chart-options';

type ChartDataItem = {
  az: number;
  el: number;
  slope: number[] | number;
};

@Component({
  selector: 'fds-track-data-graph',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    NgApexchartsModule,
    SitesComponent,
    SettingsComponent,
  ],
  templateUrl: './track-data-graph.component.html',
  styleUrls: ['./track-data-graph.component.css'],
})
export class TrackDataGraphComponent {
  @ViewChild(ChartComponent) chartComponent?: ChartComponent;
  @ViewChild('legend') legend?: ElementRef;

  selectedData: TableData[] = [];
  noData: boolean = true;

  //chart variables
  chartOptions: ChartOptions = {};
  chartData: ChartDataItem[] = [];
  disableUndo: boolean = true;

  series: ApexAxisChartSeries | any = [];

  zoomLevel: number = 20;
  dates: string[] = [];
  labelsShown: string[] = [];

  dataPointLength: number = 0;
  selectedDataPoint: number | null | any = null;
  deletedDataPoints: any[] | null = [];

  seriesIndexName: string = '';

  chartEvents = {
    dataPointSelection: (event: any, chartContext: any, config: any) => {
      const oldPoint = this.selectedDataPoint;
      oldPoint?.classList.remove('selected-data-point');

      event.target.classList.add('selected-data-point');

      this.selectedDataPoint = event.target;
    },
  };
  tooltipEvent = {
    custom: ({ series, seriesIndex, dataPointIndex }: any) => {
      return (
        '<div class="tooltip-box">' +
        '<span>' +
        this.series[seriesIndex].site +
        '</span> <br/>' +
        '<span> ' +
        this.dates[dataPointIndex] +
        '</span> <br/>' +
        '<span>' +
        this.series[seriesIndex].name +
        ':' +
        series[seriesIndex][dataPointIndex] +
        '</span>' +
        '</div>'
      );
    },
  };

  constructor(public trackFilesService: TrackFilesDataUtilityService) {}

  orderByDate(data: TrackFile[]) {
    return data.sort((a, b) => {
      const firstDate = new Date(a.creationDate);
      const lastDate = new Date(b.creationDate);
      return Number(firstDate) - Number(lastDate);
    });
  }

  ngOnInit() {
    this.selectedData = this.trackFilesService.tableService.data.filter(
      (item) => item.selected
    );
    this.noData = this.selectedData.length < 1;
    this.chartOptions = getChartOptions(
      this.chartEvents,
      this.tooltipEvent,
      this.labelsShown
    );
    this.series = getSeries();
    this.orderByDate(this.selectedData);

    this.dates = this.selectedData.map((file: any) =>
      file.creationDate.toLocaleDateString()
    );
    this.labelsShown = this.dates;
    this.chartData = this.selectedData.map((file: any) => {
      const azimuth = file.initialOrbitProperties.azimuth.value;
      const elevation = file.initialOrbitProperties.elevation.value;
      const inclination = file.initialOrbitProperties.inclination.value;
      return { az: azimuth, el: elevation, slope: inclination };
    });
    this.chartOptions.xaxis.categories = this.labelsShown;
    this.updateSeries(this.chartData);
  }

  toggleChartSize(drawerOpen: boolean) {
    this.chartComponent?.updateOptions({
      chart: {
        width: drawerOpen ? '76%' : '100%',
      },
    });
    this.legend?.nativeElement.classList.toggle('legend-pushed', drawerOpen);
  }

  updateSeries = (data: ChartDataItem[]) => {
    let dataPointLength: number = 0;
    const updatedData = this.series.map((series: any) => {
      const key = series.name.toLowerCase() as keyof ChartDataItem;

      const newData = data.map((datum) => {
        dataPointLength = dataPointLength + 1;
        return datum[key];
      });

      return this.chartData[0].hasOwnProperty(key)
        ? { ...series, data: newData }
        : series;
    });
    this.series = updatedData;
    this.dataPointLength = dataPointLength;
  };

  toggleData(index: number) {
    const series = this.series[index];
    series.visible = !series.visible;

    let markers: number[] = [];
    let dataPoints: number = 0;

    const updatedSeries = this.series.filter((data: any) => {
      if (data.visible) {
        markers.push(data.markerSize);
        dataPoints = dataPoints + data.data.length;
      }
      return data.visible;
    });
    this.dataPointLength = dataPoints;
    this.chartComponent?.updateSeries(updatedSeries);
    this.chartComponent?.updateOptions({ markers: { size: [...markers] } });
  }

  onDelete() {
    if (!this.selectedDataPoint) return;
    this.selectedDataPoint.classList.add('hide-node');
    this.deletedDataPoints?.push(this.selectedDataPoint);
    if ((this.deletedDataPoints as number[]).length >= 1) {
      this.disableUndo = false;
    }
    this.dataPointLength = this.dataPointLength - 1;
  }

  onUndo() {
    const newUndoArray = this.deletedDataPoints;
    const undoVal = newUndoArray?.pop();
    undoVal.classList.remove('hide-node');
    this.deletedDataPoints = newUndoArray;
    if ((this.deletedDataPoints as number[]).length < 1) {
      this.disableUndo = true;
    }
    this.dataPointLength = this.dataPointLength + 1;
  }

  handleZoom(event: any) {
    this.zoomLevel = event.target.value;
    this.labelsShown = this.dates.slice(0, this.zoomLevel);

    //Update both series, categories, and labels on zoom
    const zoomedData = this.chartData.slice(0, this.zoomLevel);
    this.updateSeries(zoomedData);
    this.chartComponent?.updateOptions({
      xaxis: {
        categories: this.labelsShown,
        tickAmount: this.labelsShown.length,
      },
    });
  }
}
