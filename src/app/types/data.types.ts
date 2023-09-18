export type Scenario = {
  id: string
  name: string
  spaceCraft: Spacecraft[]
}

type Spacecraft = {
  id: string
  catalogId: string
  trackFileIds: string[]
}

type OrbitProperty = {
  value: number
  unit: string
}

type TrackFile = {
  id: string
  name: string
  creationDate: string
  fileSize: number
  epehemerisSourceFile: EphemerisFile
  tleSourceFile: TLEFile
  epochRangeStart: string
  epochRangeEnd: string
  thrustProfileFileName: string
  processedTrackFile: ProcessedTrackFile | null
  initialOrbitProperties: {
    argOfPerigee: OrbitProperty
    apogee: OrbitProperty
    meanMotionDDot: OrbitProperty
    perigee: OrbitProperty
    semiMajorAxis: OrbitProperty
    bStar: OrbitProperty
    inclination: OrbitProperty
    period: OrbitProperty
    meanMotion: OrbitProperty
    eccentricity: OrbitProperty
    raan: OrbitProperty
    revNo: OrbitProperty
    meanMotionDot: OrbitProperty
    meanAnomaly: OrbitProperty
    mass: OrbitProperty
  }
}

type ProcessedTrackFile = {
  trackFileRefId: string
  name: string
  creationDate: string
  finalOrbitProperties: {
    argOfPerigee: OrbitProperty
    apogee: OrbitProperty
    meanMotionDDot: OrbitProperty
    perigee: OrbitProperty
    semiMajorAxis: OrbitProperty
    bStar: OrbitProperty
    inclination: OrbitProperty
    period: OrbitProperty
    meanMotion: OrbitProperty
    eccentricity: OrbitProperty
    raan: OrbitProperty
    revNo: OrbitProperty
    meanMotionDot: OrbitProperty
    meanAnomaly: OrbitProperty
    mass: OrbitProperty
  }
}

type EphemerisFile = {
  trackFileRefId: string
  name: string
  data: {
    [key: string]: Ephemeride
  }
}

type TLEFile = {
  trackFileRefId: string
  name: string
  line1: string
  line2: string
}

type Ephemeride = { p: [number, number, number]; v: [number, number, number] }

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
