import {
  randomNum,
  randNumWithDecimals,
} from 'src/app/mock-data/generate-data';
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

const getRandomValues = (properties: any): any => {
  const values = {
    properties,
    finalAzimuth: randomNum(300, 360),
    finalElevation: randNumWithDecimals(2.999, 4.999),
    finalRange: randomNum(151, 360),
    initialAzimuth: randomNum(0, 299),
    initialElevation: randNumWithDecimals(0.999, 1.999),
    initialRange: randomNum(0, 150),
  };
  return values;
};

export const PERFORMANCE_DATA = properties.map<PerformanceData>((property) => ({
  property,
  ...getRandomValues(property),
}));

export const PERFORMANCE_DATA_2 = properties.map<PerformanceData>((property) => ({
    property,
    ...getRandomValues(property),
  })
);

export const PERFORMANCE_DATA_3 = properties.map<PerformanceData>((property) => ({
    property,
    ...getRandomValues(property),
  })
);

export const CUMULATIVE_DATA = properties.map(
  (property: Property, index: number) => {
    const cellSum = {
      property,
      finalAzimuth: 0,
      finalElevation: 0,
      finalRange: 0,
      initialAzimuth: 0,
      initialElevation: 0,
      initialRange: 0,
    };

    cellSum.finalAzimuth =
      PERFORMANCE_DATA[index].finalAzimuth +
      PERFORMANCE_DATA_2[index].finalAzimuth +
      PERFORMANCE_DATA_3[index].finalAzimuth;

    cellSum.finalElevation =
      PERFORMANCE_DATA[index].finalElevation +
      PERFORMANCE_DATA_2[index].finalElevation +
      PERFORMANCE_DATA_3[index].finalElevation;

    cellSum.finalRange =
      PERFORMANCE_DATA[index].finalRange +
      PERFORMANCE_DATA_2[index].finalRange +
      PERFORMANCE_DATA_3[index].finalRange;

    cellSum.initialAzimuth =
      PERFORMANCE_DATA[index].initialAzimuth +
      PERFORMANCE_DATA_2[index].initialAzimuth +
      PERFORMANCE_DATA_3[index].initialAzimuth;

    cellSum.initialElevation =
      PERFORMANCE_DATA[index].initialElevation +
      PERFORMANCE_DATA_2[index].initialElevation +
      PERFORMANCE_DATA_3[index].initialElevation;

    cellSum.initialRange =
      PERFORMANCE_DATA[index].initialRange +
      PERFORMANCE_DATA_2[index].initialRange +
      PERFORMANCE_DATA_3[index].initialRange;

    return cellSum;
  }
);
