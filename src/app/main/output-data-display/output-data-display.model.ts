import type { Status } from '@astrouxds/astro-web-components/dist/types/components';

import { MenuItem } from 'src/app/shared/units/units.model';

export type CurrentView = 'View Table' | 'View Graph';

export type DefaultValue = boolean | string | number | SelectOption[];

export interface SelectOption extends MenuItem {
  selected: boolean;
}

export interface SolutionData {
  id: string;
  property: string;
  initial: number;
  final: number | string;
  difference: number | string;
  deviation: number | string;
  trackFileId: string;
  status: Status;
  units: MenuItem[];
}

export type Property =
  | 'Start'
  | 'Duration'
  | 'Stop'
  | 'Accepted'
  | 'Edited'
  | 'Outliers'
  | 'Total'
  | 'Outlier Rate'
  | 'Minimum'
  | 'Mean'
  | 'Maximum'
  | 'Std Dev'
  | 'RMS';

export interface PerformanceData {
  property: Property;
  initialRange: number;
  finalRange: number;
  initialAzimuth: number;
  finalAzimuth: number;
  initialElevation: number;
  finalElevation: number;
}
