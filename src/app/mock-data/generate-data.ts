import { faker } from '@faker-js/faker';
import type {
  Spacecraft,
  Scenario,
  ProcessedTrackFile,
  TrackFile,
  TLEFile,
  EphemerisFile,
  OrbitProperty,
  OrbitProperties,
  Ephemeride,
} from '../types/data.types';

export const randomNum = (min = 1e9, max = 9e9) => {
  return faker.number.int({ min, max });
};

export const randNumWithDecimals = (min: number, max: number) => {
  const randomNum = Math.random() * (max - min) + min;
  return Number(randomNum.toPrecision(4));
};

const generateScenario = (scenarioName: string): Scenario => {
  const numOfSpaceCraft = faker.number.int({ min: 4, max: 8 });
  const scenarioId = crypto.randomUUID();

  return {
    id: scenarioId,
    name: scenarioName,
    spaceCraftIds: Array(numOfSpaceCraft)
      .fill(null)
      .map(() => ({
        id: crypto.randomUUID(),
        catalogId: 'IRON ' + faker.number.int({ min: 1000, max: 9999 }),
      })),
  };
};

const generateSpacecraft = (
  id: string,
  catalogId: string,
  scenarioId: string
): Spacecraft => {
  const trackFileArrayLength = faker.number.int({ min: 20, max: 30 });

  return {
    id: id,
    catalogId: catalogId,
    trackFileIds: Array.from(Array(trackFileArrayLength), (_) =>
      faker.string.uuid()
    ),
    eventData: [],
    scenarioRefId: scenarioId,
  };
};

const generateTrackFile = (
  spaceCraftRefId: string,
  id: string,
  index: number
): TrackFile => {
  const fileSizeNum = faker.number.int({ min: 30, max: 300 });
  const epoch = faker.date.recent({ refDate: new Date(), days: 2 });

  return {
    id,
    spaceCraftRefId: spaceCraftRefId,
    name: 'trackfile_' + index,
    creationDate: faker.date.recent({ days: 120 }),
    fileSize: fileSizeNum,
    ephemerisSourceFile: generateEphemerisFile(
      id,
      epoch,
      14,
      randomNum(-400, 1000),
      randomNum(-400, 1000),
      randomNum(-400, 800),
      randomNum(-400, 800)
    ),
    tleSourceFile: generateTLEFile(id, index),
    epochRangeStart: epoch,
    epochRangeEnd: faker.date.soon({ refDate: epoch, days: 5 }),
    thrustProfileFileName: 'thrustProfile_' + faker.hacker.ingverb() + '.txt',
    processedTrackFile: null,
    initialOrbitProperties: generateSatProperties(),
  };
};

export const generateEphemerisFile = (
  trackFileId: string,
  startDatetime: Date,
  span: number,
  satPos1X: number,
  satPos1Y: number,
  satPos2X: number,
  satPos2Y: number
): EphemerisFile => {
  const firstEphemeride = {
    epoch: startDatetime,
    positionX: faker.number.int({ min: 300, max: 500 }),
    positionY: faker.number.int({ min: 300, max: 500 }),
    positionZ: faker.number.int({ min: 300, max: 500 }),
    velocityX: faker.number.int({ min: 300, max: 500 }),
    velocityY: faker.number.int({ min: 300, max: 500 }),
    velocityZ: faker.number.int({ min: 300, max: 500 }),
  };

  let endDatetime = new Date(startDatetime);
  endDatetime.setDate(endDatetime.getDate() + Number(span));
  const lastEphemeride = {
    epoch: endDatetime,
    positionX: faker.number.int({ min: 300, max: 500 }),
    positionY: faker.number.int({ min: 300, max: 500 }),
    positionZ: faker.number.int({ min: 300, max: 500 }),
    velocityX: faker.number.int({ min: 300, max: 500 }),
    velocityY: faker.number.int({ min: 300, max: 500 }),
    velocityZ: faker.number.int({ min: 300, max: 500 }),
  };

  const betweenEphemerides = Array.from(Array(30), (_) =>
    generateEphemeride(startDatetime, endDatetime)
  );

  return {
    id: crypto.randomUUID(),
    trackFileRefId: trackFileId,
    name: `trackfile_${trackFileId}_Ephemeris.txt`,
    epoch: startDatetime,
    ephemerides: [firstEphemeride, ...betweenEphemerides, lastEphemeride],
    satCords: {
      satPos1X: satPos1X,
      satPos1Y: satPos1Y,
      satPos2X: satPos2X,
      satPos2Y: satPos2Y,
    },
  };
};

const generateEphemeride = (start: Date, end: Date): Ephemeride => {
  const fakeEpoch = faker.date.between({ from: start, to: end });

  return {
    epoch: fakeEpoch,
    positionX: faker.number.int({ min: 300, max: 500 }),
    positionY: faker.number.int({ min: 300, max: 500 }),
    positionZ: faker.number.int({ min: 300, max: 500 }),
    velocityX: faker.number.int({ min: 300, max: 500 }),
    velocityY: faker.number.int({ min: 300, max: 500 }),
    velocityZ: faker.number.int({ min: 300, max: 500 }),
  };
};

const generateTLEFile = (trackFileId: string, index: number): TLEFile => {
  return {
    trackFileRefId: trackFileId,
    name: 'trackfile_' + trackFileId + '_TLE.txt',
    line1:
      '1 25544U 98067A   23261.87436073  .00014645  00000-0  26964-3 0  9992',
    line2:
      '2 25544  51.6416 224.4564 0005880  33.3950 353.6634 15.49394965416327',
  };
};

export const generateProcessedTrackFile = (
  trackFileId: string
): ProcessedTrackFile => {
  return {
    trackFileRefId: trackFileId,
    name: 'trackfile_' + trackFileId + 'processed.txt',
    creationDate: new Date(),
    finalOrbitProperties: generateSatProperties(),
  };
};

export const generateSatProperties = (): OrbitProperties => {
  return {
    argOfPerigee: generateArgOfPerigee(),
    apogee: generateApogee(),
    azimuth: generateAzimuth(),
    elevation: generateElevation(),
    meanMotionDDot: generateMeanMotionDDot(),
    perigee: generatePerigee(),
    semiMajorAxis: generateSemiMajorAxis(),
    bStar: generateBStar(),
    inclination: generateInclination(),
    period: generatePeriod(),
    meanMotion: generateMeanMotion(),
    eccentricity: generateEccentricity(),
    raan: generateRaan(),
    revNo: generateRevNo(),
    meanMotionDot: generateMeanMotionDot(),
    meanAnomaly: generateMeanAnomaly(),
    mass: generateMass(),
  };
};

const generateArgOfPerigee = (): OrbitProperty => {
  return {
    value: faker.number.int({ min: 0, max: 360 }),
    unit: 'deg',
  };
};
const generateApogee = (): OrbitProperty => {
  return {
    value: faker.number.int({ min: 300, max: 500 }),
    unit: 'km',
  };
};

const generateMeanMotionDDot = (): OrbitProperty => {
  return {
    value: 0,
    unit: 'rev/day^3',
  };
};

const generatePerigee = (): OrbitProperty => {
  return {
    value: faker.number.int({ min: 500, max: 1000 }),
    unit: 'km',
  };
};

const generateSemiMajorAxis = (): OrbitProperty => {
  return {
    value: faker.number.int({ min: 4000, max: 10000 }),
    unit: 'km',
  };
};

const generateBStar = (): OrbitProperty => {
  return {
    value: faker.number.float({ min: 0.0001, max: 0.0005, multipleOf: 0.0001 }),
    unit: 'er^-1',
  };
};

const generateInclination = (): OrbitProperty => {
  return {
    value: faker.number.int({ min: 0, max: 360 }),
    unit: 'deg',
  };
};

const generatePeriod = (): OrbitProperty => {
  return {
    value: faker.number.float({ min: 20, max: 2000, multipleOf: 0.001 }),
    unit: 'min',
  };
};

const generateMeanMotion = (): OrbitProperty => {
  return {
    value: faker.number.float({ min: 1, max: 90, multipleOf: 0.001 }),
    unit: 'deg/hr',
  };
};

const generateEccentricity = (): OrbitProperty => {
  return {
    value: faker.number.float({
      min: 0.0004,
      max: 0.0007,
      multipleOf: 0.0000001,
    }),
    unit: '',
  };
};

const generateRaan = (): OrbitProperty => {
  return {
    value: faker.number.int({ min: 0, max: 360 }),
    unit: 'deg',
  };
};
const generateRevNo = (): OrbitProperty => {
  return {
    value: faker.number.float({ min: 0.2, max: 40, multipleOf: 0.001 }),
    unit: '',
  };
};

const generateMeanMotionDot = (): OrbitProperty => {
  return {
    value: faker.number.float({ min: 0.1, max: 40, multipleOf: 0.0001 }),
    unit: 'rev/day^2',
  };
};

const generateMeanAnomaly = (): OrbitProperty => {
  return {
    value: faker.number.int({ min: 0, max: 360 }),
    unit: 'deg',
  };
};

const generateMass = (): OrbitProperty => {
  return {
    value: faker.number.int({ min: 20, max: 1000 }),
    unit: 'kg',
  };
};

const generateAzimuth = (): OrbitProperty => {
  return {
    value: faker.number.int({ min: 0, max: 360 }),
    unit: 'deg',
  };
};
const generateElevation = (): OrbitProperty => {
  return {
    value: faker.number.int({ min: 10, max: 90 }),
    unit: 'deg',
  };
};

const scenarioNames = ['Nominal OD', 'Post SK', 'Training'];

export const mockScenarios = scenarioNames.map((name) =>
  generateScenario(name)
);
export const mockSpaceCrafts = mockScenarios.flatMap((scenario) => {
  return scenario.spaceCraftIds.map((craftIdObject) =>
    generateSpacecraft(craftIdObject.id, craftIdObject.catalogId, scenario.id)
  );
});
const trackFileIdsBySpaceCraftId: { [key: string]: string[] } = {};
mockSpaceCrafts.forEach((spacecraft) => {
  trackFileIdsBySpaceCraftId[spacecraft.id] = spacecraft.trackFileIds;
});
export const mockTrackFiles = Object.entries(
  trackFileIdsBySpaceCraftId
).flatMap(([spacecraftId, trackFileIds]) => {
  return trackFileIds.map((id, index) =>
    generateTrackFile(spacecraftId, id, index)
  );
});
