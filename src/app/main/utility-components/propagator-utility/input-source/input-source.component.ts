import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { PropagatorControlsComponent } from '../propagator-controls/propagator-controls.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { selectCurrentTrackFile } from 'src/app/+state/app.selectors';
import { Store, select } from '@ngrx/store';
import type { EphemerisFile, TrackFile } from '../../../../types/data.types';
import {
  generateEphemerisFile,
  randomNum,
} from 'src/app/mock-data/generate-data';
import { TrackFilesActions } from 'src/app/+state/app.actions';
import { ToastService } from 'src/app/shared/toast.service';
@Component({
  selector: 'fds-input-source',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    PropagatorControlsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './input-source.component.html',
  styleUrls: ['./input-source.component.css'],
})
export class InputSourceComponent {
  constructor(
    private store: Store,
    private toasts: ToastService
  ) {}
  showControlsPanel: boolean = false;

  toggleControls() {
    this.showControlsPanel = !this.showControlsPanel;
  }

  sourceSettingsForm!: FormGroup<{
    orbitSourceName: FormControl<string | null>;
    epoch: FormControl<null | string>;
    switch1: FormControl<boolean | null>;
    switch2: FormControl<boolean | null>;
    startDate: FormControl<Date | null>;
    startTime: FormControl<Date | null>;
    span: FormControl<number | null>;
  }>;

  currentTrackFile: TrackFile | null = null;
  currentTrackFile$: Subscription = this.store
    .pipe(select(selectCurrentTrackFile))
    .subscribe((result: any) => {
      this.currentTrackFile = result;
      this.sourceSettingsForm = new FormGroup({
        orbitSourceName: new FormControl(result!.ephemerisSourceFile.name),
        epoch: new FormControl(
          result!.epochRangeStart.toISOString().slice(0, 16)
        ),
        switch1: new FormControl(false),
        switch2: new FormControl(false),
        startDate: new FormControl(),
        startTime: new FormControl(),
        span: new FormControl(),
      });
    });

  onSubmit(event: SubmitEvent) {
    if (this.sourceSettingsForm.status === 'INVALID') {
      // show invalid form toast
      this.toasts.addToast({
        message: 'Please provide required values',
        hideClose: false,
        closeAfter: 3000,
      });
      return;
    }
    if (this.currentTrackFile === null) return;
    if (!this.sourceSettingsForm.value.epoch) return;

    console.log(this.sourceSettingsForm);

    const parsedEpoch: Date = new Date(
      Date.parse(this.sourceSettingsForm.value.epoch)
    );
    const { startDate, startTime, span } = this.sourceSettingsForm.value;
    const combinedDatetime = startDate + 'T' + startTime + ':00';

    // generate new EphemerisFile
    const newEphemerisSourceFile: EphemerisFile = generateEphemerisFile(
      this.currentTrackFile.id,
      new Date(combinedDatetime),
      span || 14,
      randomNum(-400, 1000),
      randomNum(-400, 1000),
      randomNum(-400, 800),
      randomNum(-400, 800)
    );

    const updatedTrackFile = {
      ...this.currentTrackFile,
      epoch: parsedEpoch,
      ephemerisSourceFile: newEphemerisSourceFile,
    };

    //Dispatch processed trackfile as a property of the current trackfile, back into state
    this.store.dispatch(
      TrackFilesActions.trackFileModified({
        trackFileId: this.currentTrackFile.id,
        updatedTrackFile,
      })
    );

    //Show the data updated toast.
    this.toasts.addToast({
      message: 'Orbit Ephemeris Data Updated',
      hideClose: false,
      closeAfter: 3000,
    });
  }
}
