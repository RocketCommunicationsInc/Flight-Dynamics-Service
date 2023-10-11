import { Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TrackFile } from 'src/app/types/data.types';
import { filter, Observable, Subscription } from 'rxjs';
import {
  selectCurrentSpaceCraftTrackFiles,
  selectCurrentTrackFile,
} from 'src/app/+state/app.selectors';
import { select, Store } from '@ngrx/store';
import { AppStore } from 'src/app/+state/app.model';
import { TrackFilesActions } from 'src/app/+state/app.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface InputData {
  databaseFile: string;
  orbitSource: string;
  epoch: Date;
  epochRange: string;
  epochSpan: number;
  thrustProfile: string;
  processedTrackFile: string | null;
}
@Component({
  selector: 'fds-inputs',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, ReactiveFormsModule],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
})
export class InputsComponent {
  destroyRef = inject(DestroyRef);

  // Form variables
  @Input() formGroup!: FormGroup<{}>;
  formData: InputData = {
    databaseFile: '',
    orbitSource: '',
    epoch: new Date(),
    epochRange: '',
    epochSpan: 0,
    thrustProfile: '',
    processedTrackFile: '',
  };

  // Trackfile data
  currentTrackFile$: Subscription | undefined;
  trackfiles$: Observable<TrackFile[] | undefined> = this.store.select(
    selectCurrentSpaceCraftTrackFiles
  );

  constructor(private store: Store<AppStore>) {}

  ngOnInit() {
    //! this needs to remain in the init so the form works.
    this.currentTrackFile$ = this.store
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        select(selectCurrentTrackFile),
        filter((val) => val !== null)
      )
      .subscribe((result) => {
        const epochStart = result!.epochRangeEnd.getTime();
        const epochEnd = result!.epochRangeStart.getTime();
        const diffTime = (epochStart - epochEnd) / (1000 * 3600 * 24);

        this.addFormControls(this.formData!);

        this.formGroup.setValue({
          databaseFile: result!.tleSourceFile.name,
          orbitSource: result!.ephemerisSourceFile.name,
          epoch: result!.creationDate,
          epochRange: `${result!.epochRangeStart} - ${result!.epochRangeEnd}`,

          epochSpan: diffTime,
          thrustProfile: result!.thrustProfileFileName,
          processedTrackFile:
            result!.processedTrackFile && result!.processedTrackFile.name,
        });
      });
  }

  addFormControls(inputData: InputData) {
    for (const [key, value] of Object.entries(inputData)) {
      this.formGroup!.addControl(key, new FormControl(value));
    }
  }
  handleSelect(e: any): void {
    this.store.dispatch(
      TrackFilesActions.trackFileSelected({ trackFileId: e.target.value })
    );
  }
}
