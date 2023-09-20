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

interface Column<TData> extends ColumnDefs<TData> {
  sorted: Sorted;
  icon: 'arrow-drop-up' | 'arrow-drop-down';
}

type Data<TData> = TData & {
  selected: boolean;
};

export class TableService<TData> {
  data: Data<TData>[];
  columns: Column<TData>[];

  constructor({ columnDefs, data }: Table<TData>) {
    this.columns = columnDefs.map((col) => ({
      ...col,
      sorted: null,
      icon: 'arrow-drop-down',
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
