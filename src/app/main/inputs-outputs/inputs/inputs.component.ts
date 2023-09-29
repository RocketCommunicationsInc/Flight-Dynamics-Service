import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Spacecraft, TrackFile } from 'src/app/types/data.types';
import { Observable, Subscription } from 'rxjs';
import {
  selectCurrentSpacecraft,
  selectCurrentTrackFile,
} from 'src/app/+state/app.selectors';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/+state/app.model';

@Component({
  selector: 'fds-inputs',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, ReactiveFormsModule],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
})
export class InputsComponent {
  spacecraft$: Observable<Spacecraft | null>;
  currentTrackFile$: Observable<TrackFile | null>;
  trackFileIds: string[] | undefined;

  inputForm = new FormGroup({
    databaseFile: new FormControl(''),
    orbitSource: new FormControl('Ephemeris'),
    epoch: new FormControl(''),
    epochRange: new FormControl(''),
    epochSpan: new FormControl(''),
    thrustProfile: new FormControl('input_file_name.abc'),
    processedTrackFile: new FormControl('input_file_name.abc'),
  });
  notificationActive = true;

  constructor(private store: Store<AppStore>) {
    this.spacecraft$ = this.store.select(selectCurrentSpacecraft);
    this.currentTrackFile$ = this.store.select(selectCurrentTrackFile);
  }

  ngOnInit() {
    this.spacecraft$.subscribe((result) => {
      this.trackFileIds = result?.trackFileIds;
    });
    this.currentTrackFile$.subscribe((result) => {
      console.log(result);
      console.log(result!.epochRangeEnd.getFullYear());
      this.inputForm.patchValue({
        thrustProfile: result!.thrustProfileFileName,
        epoch: result!.creationDate.toString(),
        epochRange: result!.epochRangeStart.toString(),
        // epochspan: (Math.ceil(Math.abs(result!.epochRangeStart - result!.epochRangeEnd))/(1000 * 60 * 60 * 24)).toString(),
      });
    });
  }
  onSubmit(): void {
    console.log(this.inputForm.value);
    //TODO hook form data into where it's going to go
  }

  handleSyncClick(): void {
    console.log('sync data');
    //TODO This method would handle data syncing
  }
}
