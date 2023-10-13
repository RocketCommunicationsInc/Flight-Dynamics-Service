export type Unit =
  | 'm'
  | 'km'
  | 'mi'
  | 'deg'
  | 'rad'
  | 'rev'
  | 'kg'
  | 'sec'
  | 'min'
  | 'hr'
  | 'day'
  | 'num'
  | 'lb';

export interface MenuItem {
  val: Unit;
  label: string;
  selected?: boolean;
}

export const meters: MenuItem = {
  val: 'm',
  label: 'Meters (m)',
};
export const kilometers: MenuItem = {
  val: 'km',
  label: 'Kilometers (km)',
};
export const miles: MenuItem = {
  val: 'mi',
  label: 'Miles (mi)',
};
export const degrees: MenuItem = {
  val: 'deg',
  label: 'Degrees (deg)',
};
export const radians: MenuItem = {
  val: 'rad',
  label: 'Radians (rad)',
};
export const revolutions: MenuItem = {
  val: 'rev',
  label: 'Revolutions (rev)',
};
export const kilograms: MenuItem = {
  val: 'kg',
  label: 'Mass (kg)',
};
export const pounds: MenuItem = {
  val: 'lb',
  label: 'Pounds (lb)',
};
export const seconds: MenuItem = {
  val: 'sec',
  label: 'Seconds (sec)',
};
export const minutes: MenuItem = {
  val: 'min',
  label: 'Minutes (min)',
};
export const hours: MenuItem = {
  val: 'hr',
  label: 'Hours (hr)',
};
export const days: MenuItem = {
  val: 'day',
  label: 'Days (day)',
};
export const number: MenuItem = {
  val: 'num',
  label: 'Number (num)',
};

export const UnitMenuItems = {
  meters,
  kilometers,
  miles,
  degrees,
  radians,
  revolutions,
  kilograms,
  pounds,
  seconds,
  minutes,
  hours,
  days,
  number,
};

export function selectUnit(unit: MenuItem) {
  return { ...unit, selected: true };
}

export type UnitPropertyMap = {
  [key: string]: MenuItem[];
};

export const RelevantUnits: UnitPropertyMap = {
  argOfPerigee: [degrees, radians],
  apogee: [kilometers, miles],
  azimuth: [degrees, radians],
  elevation: [kilometers, miles, meters],
  meanMotion: [revolutions],
  perigee: [kilometers, miles],
  semiMajorAxis: [kilometers, miles],
  inclination: [degrees, radians],
  raan: [radians, degrees],
  revNo: [revolutions],
  meanAnomaly: [degrees, radians],
  eccentricity: [number],
  mass: [kilograms, pounds],
  meanMotionDDot: [revolutions],
  meanMotionDot: [revolutions],
  bStar: [degrees, radians],
  period: [seconds, minutes, hours, days],
};
