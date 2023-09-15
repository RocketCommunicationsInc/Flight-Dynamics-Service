import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

import { randomNum, randomId } from '../random';

interface Column {
  header: string;
  field: keyof SummaryData;
  sortable?: boolean;
}

interface SummaryData {
  id: string;
  property: string;
  initial: string;
  final: string;
  difference: string;
  deviation: string;
  unit: 'Unit';
}

interface Sorted {
  field: Column['field'];
  direction: 'ASC' | 'DESC';
}

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
    initial: '0.' + randomNum(),
    final: '0.' + randomNum(),
    difference: '0.' + randomNum(),
    deviation: `0.${randomNum(100, 500)}-${randomNum(10, 50)}`,
    unit: 'Unit',
  }));

  columns: Column[] = [
    { header: '', field: 'id' },
    { header: 'Solve For', field: 'property', sortable: true },
    { header: 'Initial State', field: 'initial' },
    { header: 'Final State', field: 'final' },
    { header: 'Difference', field: 'difference', sortable: true },
    { header: 'Std Dev', field: 'deviation' },
    { header: 'Units', field: 'unit' },
  ];

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

  setIcon(field: keyof SummaryData) {
    const icons = { ASC: 'arrow-drop-down', DESC: 'arrow-drop-up' };

    if (this.sorted?.field === field) {
      return icons[this.sorted.direction];
    }

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
