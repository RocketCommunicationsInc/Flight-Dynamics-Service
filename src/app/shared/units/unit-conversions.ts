import type { Unit } from './units.model';

type UnitConversion = {
  [key in Unit]: (val: number) => number | string;
};

export const Conversions: UnitConversion = {
  m: (val: number) => val * 1000,
  mi: (val: number) => val * 0.621371,
  km: (val: number) => val,
  deg: (val: number) => `${val}\u00B0`,
  rad: (val: number) => val * (Math.PI / 180),
  rev: (val: number) => Math.abs(val / 360),
  kg: (val: number) => Math.abs(val),
  lb: (val: number) => Math.abs(val * 2.205),
  sec: (val: number) => Math.abs(val * 60),
  min: (val: number) => Math.abs(val),
  hr: (val: number) => Math.abs(val / 60),
  day: (val: number) => Math.abs(val / 60 / 24),
  num: (val: number) => Math.abs(val),
};
