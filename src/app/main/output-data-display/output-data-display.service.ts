import { Injectable } from '@angular/core';

import { ODS_DATA, SUMMARY_DATA } from './output-data-display.data';
import { Unit } from 'src/app/shared/units/units.model';
import { Conversions } from 'src/app/shared/units/unit-conversions';
import { TableService, ColumnDefs } from 'src/app/shared/table.service';
import {
  DefaultValue,
  OrbitDeterminations,
  SummaryData,
} from './output-data-display.model';

@Injectable({
  providedIn: 'root',
})
export class OutputDataDisplayService extends TableService<SummaryData> {
  criticals: OrbitDeterminations[] = [];
  diviations: OrbitDeterminations[] = [];
  warnings: OrbitDeterminations[] = [];
  ods: OrbitDeterminations[] = ODS_DATA;

  constructor() {
    const columnDefs: ColumnDefs<SummaryData>[] = [
      { header: '', field: 'id' },
      { header: 'Solve For', field: 'property', sortable: true },
      { header: 'Initial State', field: 'initial' },
      { header: 'Final State', field: 'final' },
      { header: '', field: 'status' },
      { header: 'Difference', field: 'difference', sortable: true },
      { header: 'Std Dev', field: 'deviation' },
      { header: 'Units', field: 'units' },
    ];

    super({ columnDefs, data: SUMMARY_DATA });
    // ensures most recent ods in notification
    this.ods.sort((a, b) => b.timestamp - a.timestamp);
    this.criticals = this.ods.filter((od) => od.status === 'critical');
    this.diviations = this.ods.filter((od) => od.status !== 'normal');
    this.warnings = this.ods.filter((od) => od.status === 'caution');
  }

  setDefaultCase(value: DefaultValue, unit: Unit) {
    if (typeof value === 'number') return Conversions[unit](value);
    return value;
  }

  setRowUnit(e: Event, row: SummaryData) {
    const event = e.target as HTMLRuxSelectElement;
    const newUnit = event.value as Unit;
    row.units.forEach((unit) => {
      unit.selected = unit.val === newUnit;
    });
  }

  getRowUnit(row: SummaryData): Unit {
    const selected = row.units.find((unit) => unit.selected);
    return selected?.val || 'km';
  }
}
