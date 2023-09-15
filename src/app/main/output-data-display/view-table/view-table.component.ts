import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

import { random } from '../random-num';

interface Columns {
  header: string;
  field: keyof SummaryData;
  sortable?: boolean;
}

interface SummaryData {
  id: number;
  property: string;
  initial: string;
  final: string;
  difference: string;
  deviation: string;
  unit: 'Unit';
}

@Component({
  selector: 'fds-view-table',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css'],
})
export class ViewTableComponent {
  @Output() selectedSummaries: EventEmitter<SummaryData[]> = new EventEmitter();
  selectedIds: Set<number> = new Set();
  selectedRows: Set<SummaryData> = new Set();

  summaryData: SummaryData[] = Array.from({ length: 48 }, () => ({
    id: random(),
    property: 'Orbit Property_' + random(),
    initial: '0.' + random(),
    final: '0.' + random(),
    difference: '0.' + random(),
    deviation: `0.${random(100, 500)}-${random(10, 50)}`,
    unit: 'Unit',
  }));

  columns: Columns[] = [
    { header: '', field: 'id', sortable: false },
    { header: 'Solve For', field: 'property' },
    { header: 'Initial State', field: 'initial' },
    { header: 'Final State', field: 'final' },
    { header: 'Difference', field: 'difference' },
    { header: 'Std Dev', field: 'deviation' },
    { header: 'Units', field: 'unit', sortable: false },
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
}
