import { randomNum } from 'src/app/mock-data/generate-data';
import { PerformanceData, Property } from './output-data-display.model';

const properties: Property[] = [
  'Start',
  'Duration',
  'Stop',
  'Accepted',
  'Edited',
  'Outliers',
  'Total',
  'Outlier Rate',
  'Minimum',
  'Mean',
  'Maximum',
  'Std Dev',
  'RMS',
];

export const PERFORMANCE_DATA = properties.map<PerformanceData>((property) => ({
  property,
  finalAzimuth: randomNum(),
  finalElevation: randomNum(1e6, 1e7),
  finalRange: randomNum(),
  initialAzimuth: randomNum(),
  initialElevation: randomNum(1e6, 1e7),
  initialRange: randomNum(),
}));

const cumulativeData = {
  finalAzimuth: 0,
  finalElevation: 0,
  finalRange: 0,
  initialAzimuth: 0,
  initialElevation:0,
  initialRange: 0,
}

PERFORMANCE_DATA.map((property) => {
  cumulativeData.finalAzimuth += property.finalAzimuth;
  cumulativeData.finalElevation += property.finalElevation;
  cumulativeData.finalRange += property.finalRange;
  cumulativeData.initialAzimuth += property.initialAzimuth;
  cumulativeData.initialElevation += property.initialElevation;
  cumulativeData.initialRange += property.initialRange;
})

//const total = Object.values()

export const CUMULATIVE_DATA = properties.map<PerformanceData>((property) => ({
  property,
  finalAzimuth: randomNum(),
  finalElevation: randomNum(1e6, 1e7),
  finalRange: randomNum(),
  initialAzimuth: randomNum(),
  initialElevation: randomNum(1e6, 1e7),
  initialRange: randomNum(),
}));
