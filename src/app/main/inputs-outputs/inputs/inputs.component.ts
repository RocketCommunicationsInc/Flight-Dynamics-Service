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
    epoch: new FormControl(),
    epochRange: new FormControl(),
    epochSpan: new FormControl(),
    thrustProfile: new FormControl('input_file_name.abc'),
    processedTrackFile: new FormControl('input_file_name.abc'),
  });

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
      const epochStart = result!.epochRangeEnd.getTime();
      const epochEnd = result!.epochRangeStart.getTime();
      const diffTime = (epochStart - epochEnd) / (1000 * 3600 * 24);
      this.inputForm.patchValue({
        databaseFile: result!.tleSourceFile.name,
        thrustProfile: result!.thrustProfileFileName,
        epoch: result!.creationDate,
        epochRange: `${result!.epochRangeStart} - ${result!.epochRangeEnd}`,
        epochSpan: diffTime,
        processedTrackFile: result!.processedTrackFile?.name,
      });
    });
  }
  onSubmit(): void {
    console.log(this.inputForm.value);
    //TODO hook form data into where it's going to go
  }

  handleNewFile(): void {
    console.log('new file chosen');
    //TODO This method would handle data syncing
  }
}
