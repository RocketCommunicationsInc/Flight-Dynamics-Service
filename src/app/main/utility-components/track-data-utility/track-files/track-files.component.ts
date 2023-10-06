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
import { TrackFilesTableService } from '../track-files-table.service';

@Component({
  selector: 'fds-track-files',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, FormsModule],
  providers: [TrackFilesTableService],
  templateUrl: './track-files.component.html',
  styleUrls: ['./track-files.component.css'],
})
export class TrackFilesComponent {
  trackFiles$ = this.store.select(selectCurrentSpaceCraftTrackFiles);
  selectedTrackFile$ = this.store.select(selectCurrentTrackFile);
  trackFiles: TrackFile[] = [];
  selectedTrackFile: TrackFile | null = null;

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
    public trackFilesTableService: TrackFilesTableService
  ) {}

  getTrackFileData() {
    const data = [...this.trackFiles];
    this.trackFilesTableService.updateTableData(data);
  }

  ngOnInit() {
    this.getTrackFileData()
    this.trackFiles$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.trackFiles = res || []));
    this.selectedTrackFile$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.selectedTrackFile = res));
    this.trackFilesTableService.initialize(this.trackFiles, this.columnDefs);
    this.trackFilesTableService.selectAll();
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  onSelect(event: any) {
    this.trackFilesTableService.filter(event.target.value);
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
