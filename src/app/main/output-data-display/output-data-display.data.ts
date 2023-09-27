import { randomId, randomNum } from 'src/app/shared';
import { UnitMenuItems } from 'src/app/shared/units/units.model';
import { PerformanceData } from './performance-table/performance.model';
import {
  OrbitDeterminations,
  StatusOptions,
  SummaryData,
} from './output-data-display.model';

const now = new Date().getTime();

export const ODS_DATA: OrbitDeterminations[] = [
  {
    message: 'OD warning message on',
    status: 'caution',
    timestamp: now - randomNum(),
  },
  {
    message: 'OD critical message on',
    status: 'critical',
    timestamp: now - randomNum(),
  },
  {
    message: 'OD success message on',
    status: 'normal',
    timestamp: now,
  },
  {
    message: 'OD success message on',
    status: 'normal',
    timestamp: now - randomNum(),
  },
  {
    message: 'OD warning message on',
    status: 'caution',
    timestamp: now - randomNum(),
  },
  {
    message: 'OD warning message on',
    status: 'caution',
    timestamp: now - randomNum(),
  },
  {
    message: 'OD warning message on',
    status: 'caution',
    timestamp: now - randomNum(),
  },
  {
    message: 'OD success message on',
    status: 'normal',
    timestamp: now - randomNum(),
  },
];

export const SUMMARY_DATA: SummaryData[] = Array.from(
  { length: 48 },
  (): SummaryData => ({
    id: randomId(),
    property: 'Orbit Property_' + randomId().toUpperCase(),
    initial: randomNum(),
    final: randomNum(),
    status: StatusOptions[randomNum(0, 2)],
    difference: randomNum(),
    deviation: randomNum(100, 500),
    units: [
      { ...UnitMenuItems.meters, selected: false },
      { ...UnitMenuItems.kilometers, selected: true },
      { ...UnitMenuItems.miles, selected: false },
    ],
  })
);

export const PERFORMANCE_DATA: PerformanceData[] = [
  {
    property: 'Start',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Duration',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Stop',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Accepted',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Edited',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Outliers',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Total',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Outlier Rate',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Minimum',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Mean',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Maximum',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'Std Dev',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
  {
    property: 'RMS',
    finalAzimuth: randomNum(),
    finalElevation: randomNum(1e6, 1e7),
    finalRange: randomNum(),
    initialAzimuth: randomNum(),
    initialElevation: randomNum(1e6, 1e7),
    initialRange: randomNum(),
  },
];
