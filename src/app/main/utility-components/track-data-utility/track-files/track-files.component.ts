import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectCurrentSpaceCraftTrackFiles,
  selectCurrentTrackFile,
} from 'src/app/+state/app.selectors';
import { TrackFile } from 'src/app/types/data.types';
import { TrackFilesActions } from 'src/app/+state/app.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { TrackFilesDataUtilityService } from '../track-files-data.service';
import { TableService } from 'src/app/shared/table.service';

@Component({
  selector: 'fds-track-files',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, FormsModule],
  providers: [TableService],
  templateUrl: './track-files.component.html',
  styleUrls: ['./track-files.component.css'],
})
export class TrackFilesComponent {

  sharedData = this.trackFilesService.get()

  trackFiles$ = this.store.select(selectCurrentSpaceCraftTrackFiles);
  selectedTrackFile$ = this.store.select(selectCurrentTrackFile);
  trackFiles: TrackFile[] = [];
  selectedTrackFile: TrackFile | null = null;

  selectedIds: string[] = []

  //editing
  editedContent: string = '';
  editTrackFile: boolean = false;
  lorem: string = `The most significant things we can think about, when we think about Apollo, is that it has opened for us, for us being the World, a challenge of the future. The door is now cracked, but the promise of that future lies in the young people, not just in America, but the young people all over the world. Learning to live and learning to work together. In order to remind all the peoples of the World, in so many countries throughout the world, that this is what we all are striving for in the future, Jack has picked up a very significant rock, typical of what we have here in the valley of Taurus Littrow. It's a rock composed of many fragments, of many sizes, and many shapes, probably from all parts of the Moon, perhaps billions of years old. But a rock of all sizes and shapes, fragments of all sizes and shapes, and even colors that have grown together to become a cohesive rock outlasting the nature of Space, sort of living together in a very coherent, very peaceful manner. When we return this rock or some of the others like it to Houston, we'd like to share a piece of this rock with so many of the countries throughout the world. We hope that this will be a symbol of what our feelings are, what the feelings of the Apollo Program are, and a symbol of mankind that we can live in peace and harmony in the future.`;

  //table defs
  columnDefs = [
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
    public trackFilesService: TrackFilesDataUtilityService,
    public tableService: TableService<any>
  ) {}

  ngOnInit() {
    this.trackFiles$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.trackFiles = res || []));
    this.selectedTrackFile$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.selectedTrackFile = res));

    this.tableService.init({
      columnDefs: this.columnDefs,
      data: this.trackFilesService.makeTrackData(this.trackFiles)
    });
    this.selectAll();
    this.setFiles(this.trackFiles)
  }


  setFiles(data:TrackFile[]):void {
   this.trackFilesService.set(data)
  }

  selectAll(): void {
    this.tableService.data = this.tableService.data.map((row) => ({...row, selected: true}))
  }

  selectFiltered(event: Event){
    const isChecked = (event.target as HTMLRuxCheckboxElement).checked;
    this.tableService.data = this.tableService.data.map(row => !row.filtered ? {...row, selected: isChecked} : row)
  }

  //on destroy we update the data with trackfiles
  updateSharedTableData(data: any[]){
    const checkedTrackData = data.filter(datum => datum.selected)
    const updatedData = checkedTrackData.map(trackData => {
      const {filter, selected, ...trackFile } = trackData
      return trackFile
    })
    this.trackFilesService.set(updatedData)
  }


  ngOnDestroy() {
    this.updateSharedTableData(this.tableService.data)
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  onSelect(event: any) {
    this.filter(event.target.value);
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

  onRowClick(event: Event, id: string) {
    if ((event.target as HTMLElement).nodeName === 'RUX-CHECKBOX') return;
    this.store.dispatch(
      TrackFilesActions.trackFileSelected({ trackFileId: id })
    );
  }

  handleEdit() {
    //!Todo: what are we actually editing here? Right now it's just a 'content' flag thats not in app state
    this.editedContent = this.selectedTrackFile?.comment || this.lorem;
    this.editTrackFile = true;
  }

  handleCancel() {
    this.editedContent = '';
    this.editTrackFile = false;
  }

  handleSave() {
    if (this.selectedTrackFile)
      this.store.dispatch(
        TrackFilesActions.trackFileModified({
          trackFileId: this.selectedTrackFile.id,
          updatedTrackFile: {
            ...this.selectedTrackFile,
            comment: this.editedContent,
          },
        })
      );
    this.editedContent = '';
    this.editTrackFile = false;
  }
}
