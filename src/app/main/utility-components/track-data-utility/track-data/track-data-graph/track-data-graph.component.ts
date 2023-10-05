import { Component, ViewChild, ElementRef, DestroyRef, inject, Input } from '@angular/core';
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
  inc: number
  el: number
  range: number
  slope: number[] | number
}

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

  selectedTrackFiles$ = this.store.select(selectCurrentSpaceCraftTrackFiles)
  selectedTrackFiles: TrackFile[] = []

  //chart variables
  chartData: ChartDataItem[] = []
  chartFilter: string[] =[]

  series: ApexAxisChartSeries = [
    {
      name: 'Inc',
      data: [1,2,3,4,5],
      type: 'scatter',
    },
    {
      name: 'El',
      data: [1,2,3,4,5],
      type: 'scatter',
    },
    {
      name: 'Range',
      data: [1,2,3,4,5],
      type: 'scatter',
    },
    {
      name: 'Slope',
      data: [1,2,3,4,5],
      type: 'line',
      color: 'var(--color-data-visualization-3)',
    },
  ]

  zoomLevel: number = 20;
  dates: string[] = []
  labelsShown: string[] = [];

  dataPointLength: number = 0;
  dataPointToDelete: number | null = null;
  deletedDataPoints: any[] | null = [];

  //subscription cleanup
  destroyRef = inject(DestroyRef)
  destroyed = new Subject();

  constructor(private store: Store){
    this.selectedTrackFiles$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.selectedTrackFiles = res || []
    })
  }

  ngOnInit(){
    this.dates = this.selectedTrackFiles.map((file) => file.creationDate.toLocaleDateString());
    this.labelsShown = this.dates
    this.chartData = this.selectedTrackFiles.map((file) => {
      const inc = file.initialOrbitProperties.inclination.value
      const el =  inc - Math.ceil(Math.random() * 10)
      const range =  inc + Math.ceil(Math.random() * 10)
      return {inc: inc, el: el, range: range, slope: (range + el)/2};
    })
    this.chartOptions.xaxis.categories = this.labelsShown
    this.updateSeries(this.chartData)

  }

  ngOnDestroy(){
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  toggleChartSize(drawerOpen: boolean){
    this.chart?.updateOptions({
      chart: {
        width: drawerOpen ? '76%' : '100%',
      },
    });
    this.legend?.nativeElement.classList.toggle('legend-pushed', drawerOpen)
  }

  updateSeries = (data: ChartDataItem[]) => {
    let dataPointLength:number = 0
    const updatedData = this.series.map((series:any)=> {
      const key = series.name.toLowerCase() as keyof ChartDataItem

      const newData = data.map(datum => {
        dataPointLength = dataPointLength + 1
        return datum[key]})

      return this.chartData[0].hasOwnProperty(key) ? {...series, data: newData} : series
    })
    this.series = updatedData;
    this.dataPointLength = dataPointLength
  }

  selectedFilters: string[] = [];

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
    const orbitProperties = this.selectedTrackFiles.map((files) => files.initialOrbitProperties)
    const filterDummy = this.chartData.filter((size) => {
      return (
        this.selectedFilters.length === 0 ||
        this.selectedFilters.some((filter) => {
          if (filter === 'Az') {
            return size.inc < 500;
          }
          if (filter === 'El') {
            return size.inc < 1000 && size.inc >= 500;
          }
          if (filter === 'Range') {
            return size.inc > 1000;
          }
          return true;
        })
      );
    });
    // this.dataPointLength = this.chartData.length;
    // this.updateChartData(this.chartData);
  }

  onDelete() {
    if (this.dataPointToDelete !== null) {
      this.selectedTrackFiles.filter((_, index) => index !== this.dataPointToDelete);

      //take the removed obj and put the value in to a deletePointsArray for undo btn
      const removedObj = this.selectedTrackFiles.splice(this.dataPointToDelete, 1);
      const fileSize = removedObj.map((file) => file.fileSize);
      this.deletedDataPoints?.push(fileSize.pop());

      //get the updated files for series data
      // this.selectedTrackFiles = this.selectedTrackFiles.map((file) => file.fileSize);
      // this.updateChartData(this.fileSize);
      // this.dataPointLength = this.fileSize.length;

      this.dataPointToDelete = null;
      this.disableUndo = false;
    }
  }

  disableUndo: boolean = true;

  onUndo() {
    const lastValRemoved = this.deletedDataPoints?.pop();
    const deletedArr = (this.deletedDataPoints as number[]).length;
    // if (Number(lastValRemoved)) {
    //   this.fileSize.push(Number(lastValRemoved));
    //   if (deletedArr < 1) {
    //     this.disableUndo = true;
    //   }
    // }
    // this.updateChartData(this.fileSize);
    // this.dataPointLength = this.fileSize.length;
  }

  handleZoom(event: any) {
    this.zoomLevel = event.target.value;
    this.labelsShown = this.dates.slice(0, this.zoomLevel);

    //Update both series, categories, and labels on zoom
    const zoomedData = this.chartData.slice(0, this.zoomLevel)
    this.updateSeries(zoomedData)
    this.chart?.updateOptions({
      xaxis: {
        categories: this.labelsShown,
        tickAmount: this.labelsShown.length,
      },
    });
  }

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
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          this.dataPointToDelete = this.selectedTrackFiles.findIndex(
            (file) => file.fileSize === config?.dataPointIndex
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
      size: [6, 6, 6, 0],
      colors: ['var(--color-data-visualization-4)', 'var(--color-data-visualization-2)', 'var(--color-data-visualization-3)', 'var(--color-data-visualization-1)'],
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
      custom: ({ series, seriesIndex, dataPointIndex }: any) => {
        console.log(series)
        return (
          '<div class="tooltip-box">' +
          '<span> DGS' +
          '</span> <br/>' +
          '<span> ' +
          this.dates[dataPointIndex] +
          '</span> <br/>' +
          '<span>' + this.chartOptions.series[seriesIndex].name + ':' +
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
