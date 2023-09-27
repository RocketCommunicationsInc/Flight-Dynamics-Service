import { Injectable } from '@angular/core';

// import { ODS_DATA, SUMMARY_DATA } from './output-data-display.data';
import { Unit } from 'src/app/shared/units/units.model';
import { Conversions } from 'src/app/shared/units/unit-conversions';
import { TableService, ColumnDefs } from 'src/app/shared/table.service';
import { EphemerisFile, Ephemeride } from '../../../../types/data.types';
import { MenuItem } from 'src/app/shared/units/units.model';

export interface SelectOption extends MenuItem {
  selected: boolean;
}

export type DefaultValue = boolean | string | number | SelectOption[];

@Injectable({
  providedIn: 'root',
})
export class OutputDataDisplayService extends TableService<EphemerisFile> {
  constructor() {
    const columnDefs: ColumnDefs<EphemerisFile>[] = [
      { header: '', field: 'id' },
      { header: 'Epoch', field: 'epoch', sortable: true },
      { header: 'Position X', field: 'posiiton x' },
      { header: 'Position Y', field: 'posiiton y' },
      { header: 'Position Z', field: 'posiiton z' },
      { header: 'Velocity X', field: 'velocity x' },
      { header: 'Velocity Y', field: 'velocity y' },
      { header: 'Velocity Z', field: 'velocity z' },
      { header: 'Units', field: 'units' },
    ];

    super({ columnDefs, data: EPHEMERIS_DATA });
    // ensures most recent ods in notification
  }

  setDefaultCase(value: DefaultValue, unit: Unit) {
    if (typeof value === 'number') return Conversions[unit](value);
    return value;
  }

  setRowUnit(e: Event, row: Ephemeride) {
    const event = e.target as HTMLRuxSelectElement;
    const newUnit = event.value as Unit;
    row.units.forEach((unit) => {
      unit.selected = unit.val === newUnit;
    });
  }

  getRowUnit(row: Ephemeride): Unit {
    const selected = row.units.find((unit) => unit.selected);
    return selected?.val || 'km';
  }
}
