import { Unit } from './units.model';

type UnitConversion = {
  [key in Unit]: (val: number) => number | string;
};

export const Conversions: UnitConversion = {
  m: (val: number) => val * 1000,
  mi: (val: number) => val * 0.621371,
  deg: (val: number) => `${val}\u00B0`,
  rad: (val: number) => val * (Math.PI / 180),
  km: (val: number) => val,
};
