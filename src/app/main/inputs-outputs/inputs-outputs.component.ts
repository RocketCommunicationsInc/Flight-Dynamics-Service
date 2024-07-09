import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { InputsComponent } from './inputs/inputs.component';
import { OutputsComponent } from './outputs/outputs.component';
import { OutputDataDisplayService } from '../output-data-display/output-data-display.service';
import { LogDataService } from 'src/app/shared/event-log.service';
import type { ProcessedTrackFile, TrackFile } from 'src/app/types/data.types';
import { Subscription } from 'rxjs';
import { selectCurrentTrackFile } from 'src/app/+state/app.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { select, Store } from '@ngrx/store';
import { MockDataService } from 'src/app/api/mock-data.service';
import { TrackFilesActions } from 'src/app/+state/app.actions';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'fds-inputs-outputs',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    ReactiveFormsModule,
    InputsComponent,
    OutputsComponent,
  ],
  templateUrl: './inputs-outputs.component.html',
  styleUrls: ['./inputs-outputs.component.css'],
})
export class InputsOutputsComponent {
  // input form initial declarations
  inputForm!: FormGroup<{}>;
  processedTrackFile: ProcessedTrackFile | undefined;
  currentTrackFile: TrackFile | null | undefined;
  currentTrackFile$: Subscription = this.store
    .pipe(takeUntilDestroyed(), select(selectCurrentTrackFile))
    .subscribe((result) => {
      this.currentTrackFile = result;
    });

  constructor(
    private bannerService: OutputDataDisplayService,
    private logData: LogDataService,
    private store: Store,
    private ProcessTrackFileService: MockDataService,
    private formBuilder: FormBuilder
  ) {
    this.inputForm = this.formBuilder.group({});
  }

  onSubmit(): void {
    // generate processed trackFile using service
    (this.processedTrackFile = this.ProcessTrackFileService.processtrackFile(
      this.currentTrackFile!.id
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
    this.bannerService.handleBanner(true);
  }
}
