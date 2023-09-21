import type { Status } from '@astrouxds/astro-web-components/dist/types/components';

import { MenuItem } from 'src/app/shared/units/units.model';

export const StatusOptions: Status[] = ['caution', 'critical', 'normal'];

export type CurrentView = 'View Table' | 'View Graph';

export type DefaultValue = boolean | string | number | SelectOption[];

export interface SelectOption extends MenuItem {
  selected: boolean;
}

export interface SummaryData {
  id: string;
  property: string;
  initial: number;
  final: number;
  status: Status;
  difference: number;
  deviation: number;
  units: SelectOption[];
}

export interface OrbitDeterminations {
  message: string;
  status: Status;
  timestamp: number;
}
