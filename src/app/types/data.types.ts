interface SpaceCraftIds {
  id: string;
  catalogId: string;
}

export type Scenario = {
  id: string;
  name: string;
  spaceCraftIds: SpaceCraftIds[];
};

export type ScenarioEntity = {
  [id: string]: Scenario;
};

export type Spacecraft = {
  id: string;
  catalogId: string;
  trackFileIds: string[];
  eventData: LogData[];
  scenarioRefId: string;
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
  azimuth: OrbitProperty;
  elevation: OrbitProperty;
};

export type TrackFile = {
  id: string;
  spaceCraftRefId: string;
  name: string;
  creationDate: Date;
  fileSize: number;
  ephemerisSourceFile: EphemerisFile | null;
  tleSourceFile: TLEFile;
  epochRangeStart: Date;
  epochRangeEnd: Date;
  thrustProfileFileName: string;
  processedTrackFile: ProcessedTrackFile | null;
  initialOrbitProperties: OrbitProperties;
  //!Todo: this is a temp data holder until we decide what 'edit track file' is supposed to do
  comment?: string;
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
  ephemerides: Ephemeride[];
  epoch: Date;
  satCords: {
    satPos1X: number;
    satPos1Y: number;
    satPos2X: number;
    satPos2Y: number;
  };
};

export type Ephemeride = {
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

export type LogData = {
  timestamp: Date;
  status: string;
  message: string;
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
