import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Spacecraft, TrackFile } from 'src/app/types/data.types';
import { filter, Observable, Subscription } from 'rxjs';
import {
  selectCurrentSpacecraft,
  selectCurrentSpaceCraftTrackFileNames,
  selectCurrentSpaceCraftTrackFiles,
  selectCurrentTrackFile,
} from 'src/app/+state/app.selectors';
import { select, Store } from '@ngrx/store';
import { AppStore } from 'src/app/+state/app.model';
import { TrackFilesActions } from 'src/app/+state/app.actions';

@Component({
  selector: 'fds-inputs',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, ReactiveFormsModule],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
})
export class InputsComponent {
  inputForm!: FormGroup<{
    databaseFile: FormControl<string | null>;
    orbitSource: FormControl<string | null>;
    epoch: FormControl<Date | null>;
    epochRange: FormControl<string | null>;
    epochSpan: FormControl<number | null>;
    thrustProfile: FormControl<string | null>;
    processedTrackFile: FormControl<string | null>;
  }>;
  trackfiles$: Observable<TrackFile[] | undefined> = this.store.select(
    selectCurrentSpaceCraftTrackFiles
  );
  currentTrackFile$: Subscription = this.store
    .pipe(
      select(selectCurrentTrackFile),
      filter((val) => val !== null)
    )
    .subscribe((result) => {
      const epochStart = result!.epochRangeEnd.getTime();
      const epochEnd = result!.epochRangeStart.getTime();
      const diffTime = (epochStart - epochEnd) / (1000 * 3600 * 24);

      this.inputForm = new FormGroup({
        databaseFile: new FormControl(result!.tleSourceFile.name),
        orbitSource: new FormControl('Ephemeris'),
        epoch: new FormControl(result!.creationDate),
        epochRange: new FormControl(
          `${result!.epochRangeStart} - ${result!.epochRangeEnd}`
        ),
        epochSpan: new FormControl(diffTime),
        thrustProfile: new FormControl(result!.thrustProfileFileName),
        processedTrackFile: new FormControl(''),
      });
    });

  constructor(private store: Store<AppStore>) {}

  ngOnInit() {}
  onSubmit(): void {
    console.log(this.inputForm?.value);
    //TODO hook form data into where it's going to go
  }

  handleSelect(e: any): void {
    const event = e as CustomEvent;
    const fileId: string = event.detail.getAttribute('data-id');
    this.store.dispatch(
      TrackFilesActions.trackFileSelected({ trackFileId: fileId })
    );
  }
}
