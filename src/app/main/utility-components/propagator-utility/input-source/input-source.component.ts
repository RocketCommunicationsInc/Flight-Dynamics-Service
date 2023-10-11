import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { PropagatorControlsComponent } from '../propagator-controls/propagator-controls.component';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { selectCurrentTrackFile } from 'src/app/+state/app.selectors';
import { Store, select } from '@ngrx/store';
import type { TrackFile } from '../../../../types/data.types';
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
  constructor(private store: Store) {}
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

  currentTrackFile$: Subscription = this.store
    .pipe(select(selectCurrentTrackFile))
    .subscribe((result: any) => {
      console.log(result);
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

  onSubmit($event: any) {
    console.log($event);
  }
}

// ephemerisSourceFile: generateEphemerisFile(
//   id,
//   epoch,
//   14,
//   randomNum(-400, 1000),
//   randomNum(-400, 1000),
//   randomNum(-400, 800),
//   randomNum(-400, 800)
// ),
