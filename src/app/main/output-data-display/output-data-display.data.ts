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
  finalAzimuth: randomNum(2,4),
  finalElevation: randomNum(2,4),
  finalRange: randomNum(2,4),
  initialAzimuth: randomNum(2,4),
  initialElevation: randomNum(2,4),
  initialRange: randomNum(2,4),
}));

export const PERFORMANCE_DATA_2 = properties.map<PerformanceData>((property) => ({
  property,
  finalAzimuth: randomNum(2,4),
  finalElevation: randomNum(2,4),
  finalRange: randomNum(2,4),
  initialAzimuth: randomNum(2,4),
  initialElevation: randomNum(2,4),
  initialRange: randomNum(2,4),
}));

export const PERFORMANCE_DATA_3 = properties.map<PerformanceData>((property) => ({
  property,
  finalAzimuth: randomNum(2,4),
  finalElevation: randomNum(2,4),
  finalRange: randomNum(2,4),
  initialAzimuth: randomNum(2,4),
  initialElevation: randomNum(2,4),
  initialRange: randomNum(2,4),
}));

export const CUMULATIVE_DATA = properties.map((property: Property, index: number) => {
  const columnSum = {
    property,
    finalAzimuth: 0,
    finalElevation: 0,
    finalRange: 0,
    initialAzimuth: 0,
    initialElevation:0,
    initialRange: 0,
  }
  
  columnSum.finalAzimuth = PERFORMANCE_DATA[index].finalAzimuth + PERFORMANCE_DATA_2[index].finalAzimuth + PERFORMANCE_DATA_3[index].finalAzimuth

  columnSum.finalElevation = PERFORMANCE_DATA[index].finalElevation + PERFORMANCE_DATA_2[index].finalElevation + PERFORMANCE_DATA_3[index].finalElevation

  columnSum.finalRange = PERFORMANCE_DATA[index].finalRange + PERFORMANCE_DATA_2[index].finalRange + PERFORMANCE_DATA_3[index].finalRange

  columnSum.initialAzimuth = PERFORMANCE_DATA[index].initialAzimuth + PERFORMANCE_DATA_2[index].initialAzimuth + PERFORMANCE_DATA_3[index].initialAzimuth

  columnSum.initialElevation = PERFORMANCE_DATA[index].initialElevation + PERFORMANCE_DATA_2[index].initialElevation + PERFORMANCE_DATA_3[index].initialElevation

  columnSum.initialRange = PERFORMANCE_DATA[index].initialRange + PERFORMANCE_DATA_2[index].initialRange + PERFORMANCE_DATA_3[index].initialRange

  return columnSum
})

// const cumulativeData = {
//   finalAzimuth: [],
//   finalElevation: [],
//   finalRange: [],
//   initialAzimuth: [],
//   initialElevation:[],
//   initialRange: [],
// }

// PERFORMANCE_DATA.map((property) => {
//   cumulativeData.finalAzimuth += property.finalAzimuth;
//   cumulativeData.finalElevation += property.finalElevation;
//   cumulativeData.finalRange += property.finalRange;
//   cumulativeData.initialAzimuth += property.initialAzimuth;
//   cumulativeData.initialElevation += property.initialElevation;
//   cumulativeData.initialRange += property.initialRange;
// })

//const total = Object.values()

// const cumulativeDataArr: any[] = []

// PERFORMANCE_DATA.map((property) => {
//   const data = {
//     property, 
//     finalAzimuth: 0,
//     finalElevation: 0,
//     finalRange: 0,
//     initialAzimuth: 0,
//     initialElevation:0,
//     initialRange: 0,
//   }

//   data.finalAzimuth = randomNum(2, 10)
//   data.finalElevation = randomNum(2, 10)
//   data.finalRange = randomNum(2, 10)
//   data.initialAzimuth = randomNum(2, 10)
//   data.initialElevation = randomNum(2, 10)
//   data.initialRange = randomNum(2, 10)

//   cumulativeDataArr.push(data)

//   const columnSum = {
//     finalAzimuth: cumulativeData.finalAzimuth.reduce((acc, val) => acc + val, 0),
//     finalElevation: 0,
//     finalRange: 0,
//     initialAzimuth: 0,
//     initialElevation:0,
//     initialRange: 0,
//   }

//   const total = {
//     properties, 
//     ...columnSum
//   }
//   // for(const key in data) {
//   //   if(key) {

//   //     cumulativeData[key as keyof typeof cumulativeData].push(data[key])
//   //   }
//   // }

//   cumulativeDataArr.push(total)
// })

// console.log(cumulativeDataArr)




// export const CUMULATIVE_DATA = cumulativeDataArr.map<PerformanceData>((property) => ({
//   property,
//   finalAzimuth: randomNum(),
//   finalElevation: randomNum(1e6, 1e7),
//   finalRange: randomNum(),
//   initialAzimuth: randomNum(),
//   initialElevation: randomNum(1e6, 1e7),
//   initialRange: randomNum(),
// }));
