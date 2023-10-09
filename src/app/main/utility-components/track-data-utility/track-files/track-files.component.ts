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
import {
  SpacecraftActions,
  TrackFilesActions,
} from 'src/app/+state/app.actions';
import { TrackFilesTableService } from '../track-files-table.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { LogDataService } from 'src/app/shared/event-log.service';

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

  // Cleans up subscriptions to avoid memory leaks
  destroyRef = inject(DestroyRef);
  destroyed = new Subject();

  constructor(
    private store: Store,
    public trackFilesTableService: TrackFilesTableService,
    private logData: LogDataService
  ) {
    this.trackFiles$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.trackFiles = res || []));
    this.selectedTrackFile$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.selectedTrackFile = res));
    this.trackFilesTableService.initialize(this.trackFiles);
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
    this.editedContent = this.selectedTrackFile?.comment || '';
    this.editTrackFile = true;
  }

  handleCancel() {
    this.editedContent = '';
    this.editTrackFile = false;
  }

  handleSave() {
    if (this.selectedTrackFile) {
      this.store.dispatch(
        TrackFilesActions.trackFileModified({
          trackFileId: this.selectedTrackFile.id,
          updatedTrackFile: {
            ...this.selectedTrackFile,
            comment: this.editedContent,
          },
        })
      );

      this.logData.addEvent({
        timestamp: new Date(),
        status: 'normal',
        message: `${this.selectedTrackFile.name} edited.`,
      });
    }
    this.editedContent = '';
    this.editTrackFile = false;
  }
}
