import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProcessedTrackFile, TrackFile } from 'src/app/types/data.types';
import { filter, Observable, Subscription } from 'rxjs';
import {
  selectCurrentSpaceCraftTrackFiles,
  selectCurrentTrackFile,
} from 'src/app/+state/app.selectors';
import { select, Store } from '@ngrx/store';
import { AppStore } from 'src/app/+state/app.model';
import { TrackFilesActions } from 'src/app/+state/app.actions';
import { MockDataService } from 'src/app/api/mock-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LogDataService } from 'src/app/shared/event-log.service';

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
  @Input() formGroup!: FormGroup<{}>;
  formData: InputData | undefined;

  //trackfile data
  processedTrackFile: ProcessedTrackFile | undefined;
  currentTrackFileId: string | undefined;
  trackfiles$: Observable<TrackFile[] | undefined> = this.store.select(
    selectCurrentSpaceCraftTrackFiles
  );
  currentTrackFile: TrackFile | null | undefined;
  currentTrackFileSub: Subscription;
  currentTrackFile$ = this.store.select(selectCurrentTrackFile);
  // .pipe(
  //   takeUntilDestroyed(),
  //   select(selectCurrentTrackFile),
  //   filter((val) => val !== null)
  // )
  // .subscribe((result) => {
  //   this.currentTrackFile = result;
  //   const epochStart = result!.epochRangeEnd.getTime();
  //   const epochEnd = result!.epochRangeStart.getTime();
  //   const diffTime = (epochStart - epochEnd) / (1000 * 3600 * 24);
  //   this.currentTrackFileId = result!.id;

  //   // this.formData = {
  //   //   databaseFile: result!.tleSourceFile.name,
  //   //   orbitSource: result!.ephemerisSourceFile.name,
  //   //   epoch: result!.creationDate,
  //   //   epochRange: `${result!.epochRangeStart} - ${result!.epochRangeEnd}`,

  //   //   epochSpan: diffTime,
  //   //   thrustProfile: result!.thrustProfileFileName,
  //   //   processedTrackFile:
  //   //     result!.processedTrackFile && result!.processedTrackFile.name,
  //   // };
  //   this.formGroup!.addControl(
  //     'orbitSource',
  //     new FormControl(this.currentTrackFile!.ephemerisSourceFile.name)
  //   );
  // });

  constructor(private store: Store<AppStore>) {
    this.currentTrackFileSub = this.currentTrackFile$.subscribe((result) => {
      this.currentTrackFile = result;
      const epochStart = result!.epochRangeEnd.getTime();
      const epochEnd = result!.epochRangeStart.getTime();
      const diffTime = (epochStart - epochEnd) / (1000 * 3600 * 24);
      this.currentTrackFileId = result!.id;

      this.formData = {
        databaseFile: result!.tleSourceFile.name,
        orbitSource: result!.ephemerisSourceFile.name,
        epoch: result!.creationDate,
        epochRange: `${result!.epochRangeStart} - ${result!.epochRangeEnd}`,

        epochSpan: diffTime,
        thrustProfile: result!.thrustProfileFileName,
        processedTrackFile:
          result!.processedTrackFile && result!.processedTrackFile.name,
      };
    });
  }

  ngOnInit() {
    // this.formGroup!.addControl(
    //   'orbitSource',
    //   new FormControl(this.currentTrackFile!.ephemerisSourceFile.name)
    // );
    this.addFormControls(this.formData!);
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
