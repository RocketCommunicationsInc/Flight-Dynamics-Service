import { Injectable, DestroyRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ColumnDefs, TableService } from 'src/app/shared/table.service';
import { TrackFile } from 'src/app/types/data.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  selectCurrentSpaceCraftTrackFiles,
  selectCurrentSpacecraft,
  selectCurrentTrackFile,
} from 'src/app/+state/app.selectors';
import { TrackFilesActions } from 'src/app/+state/app.actions';

export type TrackData = TrackFile & {
  filtered?: boolean;
};

export type TableData = TrackData & {
  selected: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TrackFilesDataUtilityService {
  trackFiles$ = this.store.select(selectCurrentSpaceCraftTrackFiles);
  selectedTrackFile$ = this.store.select(selectCurrentTrackFile);
  trackFiles: TrackFile[] = [];
  selectedTrackFile: TrackFile | null = null;
  currentFilter: string | null = null;
  numberSelected: number = 0;

  //table defs
  columnDefs: ColumnDefs<TrackData>[] = [
    { header: '', field: 'id' },
    { header: 'File Name', field: 'name', sortable: true },
    { header: 'Date', field: 'creationDate', sortable: true },
    { header: 'File Size', field: 'fileSize', sortable: true },
  ];

  // Cleans up subscriptions to avoid memory leaks
  destroyRef = inject(DestroyRef);
  destroyed = new Subject();

  constructor(
    private store: Store,
    public tableService: TableService<TrackData>
  ) {
    this.trackFiles$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        const response = res ? res : [];
        this.trackFiles = response;
      });

    this.selectedTrackFile$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.selectedTrackFile = res));

    this.store
      .select(selectCurrentSpacecraft)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.trackFiles) {
          const trackData = this.makeTrackData(this.trackFiles);
          this.tableService.init({
            columnDefs: this.columnDefs,
            data: trackData,
          });
          this.selectAll();
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  makeTrackData(data: TrackFile[]) {
    return data.map((trackfile) => ({ ...trackfile, filtered: false }));
  }

  updateNumberSelected() {
    this.numberSelected = this.tableService.data.filter(
      (row) => row.selected
    ).length;
  }

  //table stuff
  selectAll(): void {
    this.tableService.data = this.tableService.data.map((row) => ({
      ...row,
      selected: true,
    }));
    this.numberSelected = this.tableService.data.length;
  }

  selectTrackFile(event: Event, file: TableData) {
    this.tableService.selectRow(event, file);
    const isChecked = (event.target as HTMLRuxCheckboxElement).checked;
    this.numberSelected = isChecked
      ? this.numberSelected + 1
      : this.numberSelected - 1;
  }

  selectFiltered(event: Event) {
    const isChecked = (event.target as HTMLRuxCheckboxElement).checked;
    this.tableService.data = this.tableService.data.map((row) => {
      return !row.filtered ? { ...row, selected: isChecked } : row;
    });
    this.numberSelected = this.tableService.data.filter(
      (row) => row.selected
    ).length;
  }

  filter(selection: string): void {
    const today = new Date();
    const within7Days = new Date();
    const within30Days = new Date();
    const within90Days = new Date();
    within7Days.setDate(today.getDate() - 7);
    within30Days.setDate(today.getDate() - 30);
    within90Days.setDate(today.getDate() - 90);

    let newData = [...this.tableService.data];

    if (selection === 'all') {
      newData = this.tableService.data.map((row) => ({
        ...row,
        filtered: false,
      }));
    }

    if (selection === 'seven-days') {
      newData = this.tableService.data.map((row) =>
        row.creationDate >= within7Days
          ? { ...row, filtered: false }
          : { ...row, filtered: true }
      );
    }

    if (selection === 'thirty-days') {
      newData = this.tableService.data.map((row) =>
        row.creationDate >= within30Days
          ? { ...row, filtered: false }
          : { ...row, filtered: true }
      );
    }

    if (selection === 'ninety-days') {
      newData = this.tableService.data.map((row) =>
        row.creationDate >= within90Days
          ? { ...row, filtered: false }
          : { ...row, filtered: true }
      );
    }

    this.tableService.data = newData;
    this.currentFilter = selection !== 'all' ? selection : null;
  }

  //dispatch stuff:
  saveToTrackFile(editedContent: string) {
    if (this.selectedTrackFile)
      this.store.dispatch(
        TrackFilesActions.trackFileModified({
          trackFileId: this.selectedTrackFile.id,
          updatedTrackFile: {
            ...this.selectedTrackFile,
            comment: editedContent,
          },
        })
      );
  }

  setTrackFile(id: string) {
    this.store.dispatch(
      TrackFilesActions.trackFileSelected({ trackFileId: id })
    );
  }
}
