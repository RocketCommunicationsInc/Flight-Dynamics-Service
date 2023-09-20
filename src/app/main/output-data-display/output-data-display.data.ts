import { randomId, randomNum } from 'src/app/shared';
import { UnitMenuItems } from 'src/app/shared/units/units.model';
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

export const SUMMARY_DATA: SummaryData[] = Array.from({ length: 48 }, () => ({
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
  selected: false,
}));
