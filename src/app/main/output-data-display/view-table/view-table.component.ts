import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

import { Unit, UnitMenuItems } from 'src/app/shared/units/units.model';
import { Conversions } from 'src/app/shared/units/unit-conversions';
import { randomNum, randomId } from '../random';
import {
  Column,
  SelectOption,
  Sorted,
  StatusOptions,
  SummaryData,
} from './view-table.model';

@Component({
  selector: 'fds-view-table',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css'],
})
export class ViewTableComponent {
  selectedIds: Set<string> = new Set();
  selectedRows: Set<SummaryData> = new Set();
  sorted: Sorted | null = null;

  summaryData: SummaryData[] = Array.from({ length: 48 }, () => ({
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
  }));

  columns: Column[] = [
    { header: '', field: 'id' },
    { header: 'Solve For', field: 'property', sortable: true },
    { header: 'Initial State', field: 'initial' },
    { header: 'Final State', field: 'final' },
    { header: '', field: 'status' },
    { header: 'Difference', field: 'difference', sortable: true },
    { header: 'Std Dev', field: 'deviation' },
    { header: 'Units', field: 'units' },
  ];

  setRowUnits(e: Event, row: SummaryData) {
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

  setDefaultCase(value: string | number | SelectOption[], unit: Unit) {
    if (typeof value === 'number') return Conversions[unit](value);
    return value;
  }

  onRowSelectAll(e: Event) {
    const isChecked = (e.target as HTMLRuxCheckboxElement).checked;
    if (isChecked) {
      this.summaryData.forEach((row) => {
        this.selectedIds.add(row.id);
        this.selectedRows.add(row);
      });
    } else {
      this.summaryData.forEach((row) => {
        this.selectedIds.delete(row.id);
        this.selectedRows.delete(row);
      });
    }

    this.getSelectedRows();
  }

  onRowSelect(e: Event, row: SummaryData) {
    const isChecked = (e.target as HTMLRuxCheckboxElement).checked;
    if (isChecked) {
      this.selectedIds.add(row.id);
      this.selectedRows.add(row);
    } else {
      this.selectedIds.delete(row.id);
      this.selectedRows.delete(row);
    }

    this.getSelectedRows();
  }

  getSelectedRows() {
    // this is where we could set the selected summary data on the store
    console.log([...this.selectedRows]);
  }

  setSortIcon(field: keyof SummaryData) {
    const icons = { ASC: 'arrow-drop-down', DESC: 'arrow-drop-up' };
    if (this.sorted?.field === field) return icons[this.sorted.direction];
    return icons['ASC'];
  }

  sortData(field: keyof SummaryData) {
    const [column] = this.columns.filter((column) => column.field === field);

    if (column.sortable) {
      if (!this.sorted || this.sorted.field !== field) {
        this.sorted = { direction: 'ASC', field };
        this._sort({ direction: 'ASC', field });
      } else {
        const direction = this.sorted.direction === 'ASC' ? 'DESC' : 'ASC';
        this.sorted = { direction, field };
        this._sort({ direction, field });
      }
    }
  }

  private _sort({ direction, field }: Sorted) {
    this.summaryData.sort((a, b) => {
      if (direction === 'DESC') {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      }
      if (a[field] < b[field]) return 1;
      if (a[field] > b[field]) return -1;
      return 0;
    });
  }
}
