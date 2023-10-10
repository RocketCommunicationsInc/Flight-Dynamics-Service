import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ProcessedTrackFile,
  Spacecraft,
  TrackFile,
} from 'src/app/types/data.types';
import { filter, Observable, Subscription } from 'rxjs';
import {
  selectCurrentSpacecraft,
  selectCurrentSpaceCraftTrackFiles,
  selectCurrentTrackFile,
} from 'src/app/+state/app.selectors';
import { select, Store } from '@ngrx/store';
import { AppStore } from 'src/app/+state/app.model';
import { TrackFilesActions } from 'src/app/+state/app.actions';
import { MockDataService } from 'src/app/api/mock-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LogDataService } from 'src/app/shared/event-log.service';

@Component({
  selector: 'fds-inputs',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, ReactiveFormsModule],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
})
export class InputsComponent {
  // scenario data
  currentScenarioId: string | undefined | null;

  //spacecraft data
  spacecraft: Spacecraft | null | undefined;
  spacecraft$: Subscription = this.store
    .pipe(
      takeUntilDestroyed(),
      filter((val) => val !== null),
      select(selectCurrentSpacecraft)
    )
    .subscribe((result) => {
      this.spacecraft = result;
      this.currentScenarioId = result?.scenarioRefId;
    });

  // input form initial declarations
  inputForm!: FormGroup<{
    databaseFile: FormControl<string | null>;
    orbitSource: FormControl<string | null>;
    epoch: FormControl<Date | null>;
    epochRange: FormControl<string | null>;
    epochSpan: FormControl<number | null>;
    thrustProfile: FormControl<string | null>;
    processedTrackFile: FormControl<string | null>;
  }>;

  //trackfile data
  processedTrackFile: ProcessedTrackFile | undefined;
  currentTrackFileId: string | undefined;
  trackfiles$: Observable<TrackFile[] | undefined> = this.store.select(
    selectCurrentSpaceCraftTrackFiles
  );
  currentTrackFile: TrackFile | null | undefined;
  currentTrackFile$: Subscription = this.store
    .pipe(
      takeUntilDestroyed(),
      select(selectCurrentTrackFile),
      filter((val) => val !== null)
    )
    .subscribe((result) => {
      this.currentTrackFile = result;
      const epochStart = result!.epochRangeEnd.getTime();
      const epochEnd = result!.epochRangeStart.getTime();
      const diffTime = (epochStart - epochEnd) / (1000 * 3600 * 24);
      this.currentTrackFileId = result!.id;

      this.inputForm = new FormGroup({
        databaseFile: new FormControl(result!.tleSourceFile.name),
        orbitSource: new FormControl(result!.ephemerisSourceFile.name),
        epoch: new FormControl(result!.creationDate),
        epochRange: new FormControl(
          `${result!.epochRangeStart} - ${result!.epochRangeEnd}`
        ),
        epochSpan: new FormControl(diffTime),
        thrustProfile: new FormControl(result!.thrustProfileFileName),
        processedTrackFile: new FormControl(
          result!.processedTrackFile && result!.processedTrackFile.name
        ),
      });
    });

  constructor(
    private store: Store<AppStore>,
    private ProcessTrackFileService: MockDataService,
    private logData: LogDataService
  ) {}

  onSubmit(): void {
    // generate processed trackFile using service
    (this.processedTrackFile = this.ProcessTrackFileService.processtrackFile(
      this.currentTrackFileId!
    )),
      //Dispatch processed trackfile as a property of the current trackfile, back into state
      this.store.dispatch(
        TrackFilesActions.trackFileModified({
          trackFileId: this.currentTrackFile!.id,
          updatedTrackFile: {
            ...this.currentTrackFile!,
            processedTrackFile: this.processedTrackFile,
          },
        })
      );

    this.logData.addEvent({
      timestamp: new Date(),
      status: 'normal',
      message: `Processed trackfile created from ${this.currentTrackFile?.name}`,
    });
  }

  handleSelect(e: any): void {
    this.store.dispatch(
      TrackFilesActions.trackFileSelected({ trackFileId: e.target.value })
    );
  }
}
