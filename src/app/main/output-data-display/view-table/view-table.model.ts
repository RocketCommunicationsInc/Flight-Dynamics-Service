import type { Status } from '@astrouxds/astro-web-components/dist/types/components';

import { MenuItem } from 'src/app/shared/units/units.model';

export interface Column {
  header: string;
  field: keyof SummaryData;
  sortable?: boolean;
}

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

export interface Sorted {
  field: Column['field'];
  direction: 'ASC' | 'DESC';
}

export const StatusOptions: Status[] = ['caution', 'critical', 'normal'];
