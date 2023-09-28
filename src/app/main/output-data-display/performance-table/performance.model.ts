type Propery =
  | 'Start'
  | 'Duration'
  | 'Stop'
  | 'Accepted'
  | 'Edited'
  | 'Outliers'
  | 'Total'
  | 'Outlier Rate'
  | 'Minimum'
  | 'Mean'
  | 'Maximum'
  | 'Std Dev'
  | 'RMS';

export interface PerformanceData {
  property: Propery;
  initialRange: number;
  finalRange: number;
  initialAzimuth: number;
  finalAzimuth: number;
  initialElevation: number;
  finalElevation: number;
}
