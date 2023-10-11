import { Injectable } from '@angular/core';

export interface Table<TData> {
  data: TData[];
  columnDefs: ColumnDefs<TData>[];
}

type Sorted = 'ASC' | 'DESC' | null;

export interface ColumnDefs<TData> {
  header: string;
  field: keyof TData;
  sortable?: boolean;
}

export interface Column<TData> extends ColumnDefs<TData> {
  sorted: Sorted;
  icon: 'arrow-drop-up' | 'arrow-drop-down';
  type: string;
}

type Data<TData> = TData & {
  selected: boolean;
};

@Injectable()
export class TableService<TData> {
  data: Data<TData>[] = [];
  columns: Column<TData>[] = [];

  init({ columnDefs, data }: Table<TData>) {
    if (data.length < 1) return;
    this.columns = columnDefs.map((col) => ({
      ...col,
      sorted: null,
      icon: 'arrow-drop-down',
      type: typeof data[0][col.field],
    }));
    this.data = data.map<Data<TData>>((row) => ({
      ...row,
      selected: false,
    }));
  }

  selectRow(e: Event, row: Data<TData>) {
    const isChecked = (e.target as HTMLRuxCheckboxElement).checked;

    row.selected = isChecked;
  }

  selectAll(e: Event) {
    const isChecked = (e.target as HTMLRuxCheckboxElement).checked;
    for (let row of this.data) {
      row.selected = isChecked;
    }
  }

  areAllSelected(): boolean {
    return this.data.every((row) => row.selected);
  }

  sort(column: Column<TData>) {
    if (column?.sortable) {
      for (let col of this.columns) {
        const match = column.field === col.field;
        if (match) {
          if (!column.sorted || column.sorted === 'ASC') {
            col.sorted = 'DESC';
            col.icon = 'arrow-drop-down';
            this.data.sort((a, b) => {
              if (a[column.field] < b[column.field]) return 1;
              if (a[column.field] > b[column.field]) return -1;
              return 0;
            });
          } else {
            col.sorted = 'ASC';
            col.icon = 'arrow-drop-up';
            this.data.sort((a, b) => {
              if (a[column.field] < b[column.field]) return -1;
              if (a[column.field] > b[column.field]) return 1;
              return 0;
            });
          }
          return;
        }
        col.sorted = null;
      }
    }
  }
}
