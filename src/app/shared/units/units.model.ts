export type Unit = 'm' | 'km' | 'mi' | 'deg' | 'rad';

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

export const UnitMenuItems = { meters, kilometers, miles, degrees, radians };

export function selectUnit(unit: MenuItem) {
  return { ...unit, selected: true };
}
