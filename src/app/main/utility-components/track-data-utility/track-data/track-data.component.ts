import { Component, ViewChild, ElementRef, DestroyRef, inject } from '@angular/core';
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
import { SitesComponent } from './sites/sites.component';
import { SettingsComponent } from './settings/settings.component';
import { Store } from '@ngrx/store';
import { selectCurrentSpaceCraftTrackFiles } from 'src/app/+state/app.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrackFile } from 'src/app/types/data.types';
import { TrackFilesTableService } from '../track-files-table.service';

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

type ChartData = {
  inc: number
  el: number
  range: number
}

@Component({
  selector: 'fds-track-data',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    NgApexchartsModule,
    SitesComponent,
    SettingsComponent,
  ],
  templateUrl: './track-data.component.html',
  styleUrls: ['./track-data.component.css'],
})
export class TrackDataComponent {
  @ViewChild(ChartComponent) chart?: ChartComponent;
  @ViewChild('legend') legend?: ElementRef;

  selectedTrackFiles$ = this.store.select(selectCurrentSpaceCraftTrackFiles)
  selectedTrackFiles: TrackFile[] = []

  //show/hide variables
  isSitesDrawerOpen: boolean = false;
  isSettingsDrawerOpen: boolean = false;
  showGraph: boolean = true;
  showTable: boolean = false;

  //table variables
  columnDefs = [
    { header: 'File Name', field: 'name', sortable: true },
    { header: 'Date', field: 'creationDate', sortable: true },
    { header: 'File Size', field: 'fileSize', sortable: true },
  ];

  //chart variables
  chartData: ChartData[] = []
  chartFilter: string[] =[]
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
  series: any = [
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
      data: this.slopeData,
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

  constructor(private store: Store, public trackFilesTableService: TrackFilesTableService){
    this.selectedTrackFiles$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.selectedTrackFiles = res || []
      this.chartData = res!.map(file => {
        const inc = file.initialOrbitProperties.inclination.value
        const el = Math.floor(Math.random() * inc - 5)
        const range = Math.ceil(Math.random() * inc + 5)
        return {inc: inc, el: el, range: range};
      })

    })
  }

  ngOnInit(){
    this.trackFilesTableService.initialize(this.selectedTrackFiles, this.columnDefs);
    this.dates = this.selectedTrackFiles.map((file) => file.creationDate.toLocaleDateString());
    this.dataPointLength = this.chartData.length
    this.labelsShown = this.dates
    this.chartOptions.xaxis.categories = this.labelsShown
    this.updateChartData()

  }

  ngOnDestroy(){
    this.destroyed.next(true);
    this.destroyed.complete();
  }

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
  }

  viewGraph() {
    this.showGraph = true;
    this.showTable = false;
  }


  updateChartData = () => {
    const updatedData = this.chartOptions.series.map((series:any)=> {
      const key = series.name.toLowerCase() as keyof ChartData
      const newData = this.chartData.map(datum => datum[key]|| 0)
      return this.chartData[0].hasOwnProperty(key) ? {...series, data: newData} : series
    })
    this.series = updatedData;
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
    this.dataPointLength = this.chartData.length;
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

  updateSeriesOne(zoomLevel: number) {
    // return this.fileSize.slice(0, zoomLevel);
  }

  updateSeriesTwo(zoomLevel: number) {
    return this.slopeData.slice(0, zoomLevel);
  }

  handleZoom(event: any) {
    this.zoomLevel = event.target.value;
    this.labelsShown = this.dates.slice(0, this.zoomLevel);

    //Update both series, categories, and labels on zoom
    // this.updateChartData(this.updateSeriesOne(this.zoomLevel));
    this.updateSlopeData(this.updateSeriesTwo(this.zoomLevel));
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
