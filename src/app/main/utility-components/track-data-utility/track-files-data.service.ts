import { Injectable, DestroyRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ColumnDefs, TableService } from 'src/app/shared/table.service';
import { TrackFile } from 'src/app/types/data.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectCurrentSpaceCraftTrackFiles, selectCurrentTrackFile } from 'src/app/+state/app.selectors';
import { TrackFilesActions } from 'src/app/+state/app.actions';

export type TrackData = TrackFile & {
  filtered?: boolean
}

@Injectable({
  providedIn: 'root',
})
export class TrackFilesDataUtilityService {

  trackFiles$ = this.store.select(selectCurrentSpaceCraftTrackFiles);
  selectedTrackFile$ = this.store.select(selectCurrentTrackFile);
  trackFiles: TrackFile[] = [];
  selectedTrackFile: TrackFile | null = null;

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
    public tableService: TableService<TrackData>,
  ) {
    this.trackFiles$
  .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        const response = res ? res : []
        this.trackFiles = response
          if(response){
            const trackData = this.makeTrackData(response)

            this.tableService.init({
              columnDefs: this.columnDefs,
              data: trackData,
            })

            this.selectAll()
        }
      });
    this.selectedTrackFile$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.selectedTrackFile = res));
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  get() {
    return this.tableService.data
  }

  makeTrackData(data: TrackFile[]){
    return data.map((trackfile) => ({...trackfile, filtered: false}))
  }

  //table stuff
  selectAll(): void {
    this.tableService.data = this.tableService.data.map((row) => ({...row, selected: true}))
  }

  selectFiltered(event: Event){
    const isChecked = (event.target as HTMLRuxCheckboxElement).checked;
    this.tableService.data = this.tableService.data.map(row => !row.filtered ? {...row, selected: isChecked} : row)
  }

  filter(selection: string): void {
    const today = new Date();
    const within7Days = new Date();
    const within30Days = new Date();
    const within90Days = new Date();
    within7Days.setDate(today.getDate() - 7);
    within30Days.setDate(today.getDate() - 30);
    within90Days.setDate(today.getDate() - 90);

    let newData = [...this.tableService.data]

    if (selection === 'all') {
      newData = this.tableService.data.map(row => ({...row, filtered: false}))
    }

    if (selection === 'seven-days') {
      newData = this.tableService.data.map((row) => row.creationDate >= within7Days ? {...row, filtered: false} : {...row, filtered: true});
    }

    if (selection === 'thirty-days') {
      newData = this.tableService.data.map((row) => row.creationDate >= within30Days ? {...row, filtered: false} : {...row, filtered: true});
    }

    if (selection === 'ninety-days') {
      newData = this.tableService.data.map((row) => row.creationDate >= within90Days ? {...row, filtered: false} : {...row, filtered: true});
    }

    this.tableService.data = newData
  }

  //dispatch stuff:
  saveToTrackFile(editedContent:string){
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

  setTrackFile(id:string){
    this.store.dispatch(
      TrackFilesActions.trackFileSelected({ trackFileId: id })
    );
  }

}
