export type Scenario = {
  id: string;
  name: string;
  spaceCraft: Spacecraft[];
};

export type ScenarioEntity = {
  [id: string]: Scenario;
};

export type Spacecraft = {
  id: string;
  catalogId: string;
  trackFileIds: string[];
};

export type SpacecraftEntity = {
  [id: string]: Spacecraft;
};

export type OrbitProperty = {
  value: number;
  unit: string;
};

export type OrbitProperties = {
  argOfPerigee: OrbitProperty;
  apogee: OrbitProperty;
  meanMotionDDot: OrbitProperty;
  perigee: OrbitProperty;
  semiMajorAxis: OrbitProperty;
  bStar: OrbitProperty;
  inclination: OrbitProperty;
  period: OrbitProperty;
  meanMotion: OrbitProperty;
  eccentricity: OrbitProperty;
  raan: OrbitProperty;
  revNo: OrbitProperty;
  meanMotionDot: OrbitProperty;
  meanAnomaly: OrbitProperty;
  mass: OrbitProperty;
};

export type TrackFile = {
  id: string;
  spaceCraftRefId: string;
  name: string;
  creationDate: Date;
  fileSize: number;
  ephemerisSourceFile: EphemerisFile;
  tleSourceFile: TLEFile;
  epochRangeStart: Date;
  epochRangeEnd: Date;
  thrustProfileFileName: string;
  processedTrackFile: ProcessedTrackFile | null;
  initialOrbitProperties: OrbitProperties;
};

export type TrackFileEntity = {
  [id: string]: TrackFile;
};

export type ProcessedTrackFile = {
  trackFileRefId: string;
  name: string;
  creationDate: Date;
  finalOrbitProperties: OrbitProperties;
};

export type EphemerisFile = {
  id: string;
  trackFileRefId: string;
  name: string;
  epoch: Date;
  positionX: number;
  positionY: number;
  positionZ: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
};

export type TLEFile = {
  trackFileRefId: string;
  name: string;
  line1: string;
  line2: string;
};

export type Ephemeride = {
  p: [number, number, number];
  v: [number, number, number];
};

//TODO: work out performance table properties with design.
// const PERFORMANCE_TABLE_COLUMNS = {
//   properties: [
//     'Start',
//     'Duration',
//     'Stop',
//     'Accepted',
//     'Edited',
//     'Outliers',
//     'Total',
//     'Outlier Rate',
//     'Minimum',
//     'Maximum',
//     'Std Dev',
//     'RMS',
//   ],
//   antennaOptions: ['Cumulative', 'Pass 1', 'Pass 2', 'Pass 3'],

//   cumulativeColumns: [
//     'Range (Initial)',
//     'Range (Final)',
//     'Azimuth (Initial)',
//     'Azimuth (Final)',
//     'Elevation (Initial)',
//     'Elevation (Final)',
//   ],
//   eci: [
//     'OD Prior (Initial)',
//     'OD Prior (Initial Std Dev)',
//     'OD Prior (Correlation)',
//     'Differential',
//     'Differential (Diff Std Dev)',
//     'Differential (Correlation Ratio)',
//     'Estimate (Differential)',
//     'Estimate (Diff Std Dev)',
//     'Estamate (Correlation Ratio)',
//   ],
//   covarianceMatrix: [
//     'X Position',
//     'Y Position',
//     'Z Position',
//     'X Velocity',
//     'Y Velocity',
//     'Z Velocity',
//   ],
// }
