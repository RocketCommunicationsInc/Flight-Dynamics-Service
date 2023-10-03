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
