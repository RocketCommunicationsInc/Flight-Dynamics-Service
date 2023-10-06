import {
  Component,
  ViewChild,
  ElementRef,
  DestroyRef,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
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
import { SitesComponent } from '../sites/sites.component';
import { SettingsComponent } from '../settings/settings.component';
import { Store } from '@ngrx/store';
import { selectCurrentSpaceCraftTrackFiles } from 'src/app/+state/app.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrackFile } from 'src/app/types/data.types';

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
  @ViewChild(ChartComponent) chart?: ChartComponent;
  @ViewChild('legend') legend?: ElementRef;

  selectedTrackFiles$ = this.store.select(selectCurrentSpaceCraftTrackFiles);
  selectedTrackFiles: TrackFile[] = [];

  //chart variables
  chartData: ChartDataItem[] = [];
  disableUndo: boolean = true;

  series: ApexAxisChartSeries | any = [
    {
      name: 'Az',
      data: [1, 2, 3, 4, 5],
      type: 'scatter',
      color: 'var(--color-data-visualization-2)',
      visible: true,
      markerSize: 6,
    },
    {
      name: 'El',
      data: [1, 2, 3, 4, 5],
      type: 'scatter',
      color: 'var(--color-data-visualization-6)',
      visible: true,
      markerSize: 6,
    },
    {
      name: 'Slope',
      data: [1, 2, 3, 4, 5],
      type: 'line',
      color: 'var(--color-data-visualization-3)',
      visible: true,
      markerSize: 0,
    },
  ];

  zoomLevel: number = 20;
  dates: string[] = [];
  labelsShown: string[] = [];

  dataPointLength: number = 0;
  selectedDataPoint: number | null | any = null;
  deletedDataPoints: any[] | null = [];

  //subscription cleanup
  destroyRef = inject(DestroyRef);
  destroyed = new Subject();

  constructor(
    private store: Store
  ) {
    this.selectedTrackFiles$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.selectedTrackFiles = res || [];
      });
  }

  orderByDate(data: TrackFile[]) {
    return data.sort((a, b) => {
      const firstDate = new Date(a.creationDate);
      const lastDate = new Date(b.creationDate);
      return Number(firstDate) - Number(lastDate);
    });
  }

  ngOnInit() {
    this.orderByDate(this.selectedTrackFiles);

    this.dates = this.selectedTrackFiles.map((file) =>
      file.creationDate.toLocaleDateString()
    );
    this.labelsShown = this.dates;
    this.chartData = this.selectedTrackFiles.map((file) => {
      const azimuth = file.initialOrbitProperties.azimuth.value;
      const elevation = file.initialOrbitProperties.elevation.value;
      const inclination = file.initialOrbitProperties.inclination.value;
      return { az: azimuth, el: elevation, slope: inclination };
    });
    this.chartOptions.xaxis.categories = this.labelsShown;
    this.updateSeries(this.chartData);
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  toggleChartSize(drawerOpen: boolean) {
    this.chart?.updateOptions({
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

  selectedFilters: string[] = [];

  toggleData(index: number) {
    const series = this.series[index];
    series.visible = !series.visible;

    let markers: number[] = [];

    const updatedSeries = this.series.filter((data: any) => {
      if (data.visible) markers.push(data.markerSize);
      return data.visible;
    });
    this.chart?.updateSeries(updatedSeries);
    this.chart?.updateOptions({ markers: { size: [...markers] } });

  }



  onDelete() {
    if(!this.selectedDataPoint) return;
    this.selectedDataPoint.classList.add('hide-node')
    this.deletedDataPoints?.push(this.selectedDataPoint)
    if((this.deletedDataPoints as number[]).length >= 1) {
      this.disableUndo = false
    }
  }

  onUndo() {
    const newUndoArray = this.deletedDataPoints
    const undoVal = newUndoArray?.pop()
    undoVal.classList.remove('hide-node')
    this.deletedDataPoints = newUndoArray;
    if((this.deletedDataPoints as number[]).length < 1) {
      this.disableUndo = true
    }
  }

  handleZoom(event: any) {
    this.zoomLevel = event.target.value;
    this.labelsShown = this.dates.slice(0, this.zoomLevel);

    //Update both series, categories, and labels on zoom
    const zoomedData = this.chartData.slice(0, this.zoomLevel);
    this.updateSeries(zoomedData);
    this.chart?.updateOptions({
      xaxis: {
        categories: this.labelsShown,
        tickAmount: this.labelsShown.length,
      },
    });
  }

  practiceDelete() {
    if(this.selectedDataPoint !== null) {
    }
  }

  seriesIndexName: string = ''

  chartOptions: Partial<ChartOptions> | any = {
    series: this.series,
    chart: {
      height: 425,
      type: 'line',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      active: {
        allowMultipleDataPointsSelection: false,
   },
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const oldPoint = this.selectedDataPoint
          oldPoint?.classList.remove(
            'selected-data-point'
          );

          event.target.classList.add(
              'selected-data-point'
            );

          this.selectedDataPoint = event.target
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
      size: [6, 6, 0],
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    animation: {
      enabled: false,
      speed: 0,
      animateGradually: {
        enabled: false,
      },
      dynamicAnimation: {
        enabled: false,
      },
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
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      theme: '',
      custom: ({ series, seriesIndex, dataPointIndex }: any) => {
        return (
          '<div class="tooltip-box">' +
          '<span> DGS' +
          '</span> <br/>' +
          '<span> ' +
          this.dates[dataPointIndex] +
          '</span> <br/>' +
          '<span>' +
          this.chartOptions.series[seriesIndex].name +
          ':' +
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
          text: 'Az/El (degrees)',
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
