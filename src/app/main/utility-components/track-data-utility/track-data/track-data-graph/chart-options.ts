import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexMarkers,
  ApexStroke,
  ApexTooltip,
  ApexOptions,
  ChartType,
} from 'ng-apexcharts';

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  yaxis?: ApexYAxis | any;
  markers?: ApexMarkers | any;
  stroke?: ApexStroke | any;
  legend?: ApexOptions | any;
  tooltip?: ApexTooltip | any;
};

export function getSeries(){
return [
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
  ]
}

export function getChartOptions(events: {}, custom: {}, labelsShown: string[]): ChartOptions | any {

  const partialTooltip = {
    enabled: true,
    x: {
      show: false,
    },
    theme: '',
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
  }

  return ({
    chart:{
      width: '100%',
      height: 440,
      type: 'line' as ChartType,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      active: {
        allowMultipleDataPointsSelection: false,
      },
      events: events,
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
    categories: labelsShown,
    axisTicks: {
      show: true,
    },
    axisBorder: {
      show: true,
      color: 'var(--color-text-primary)',
    },
    labels: {
      rotate: -45,
      enabled: true,
      show: true,
      style: {
        colors: 'var(--color-text-primary)',
      },
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

  tooltip: {...partialTooltip, ...custom}
})
};
