import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppStore } from 'src/app/+state/app.model';
import { Store } from '@ngrx/store';
import {
  selectAllTrackFiles,
  selectCurrentSpacecraft,
  selectCurrentTrackFile,
} from 'src/app/+state/app.selectors';
import { TrackFile } from 'src/app/types/data.types';
@Component({
  selector: 'fds-inputs',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, ReactiveFormsModule],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
})
export class InputsComponent {
  inputForm = new FormGroup({
    databaseFile: new FormControl(''),
    orbitSource: new FormControl(''),
    epoch: new FormControl(''),
    epochRange: new FormControl(''),
    epochSpan: new FormControl(''),
    thrustProfile: new FormControl(''),
    processedTrackFile: new FormControl(''),
  });
  notificationActive = true;

  onSubmit(): void {
    console.log(this.inputForm.value);
    //TODO hook form data into where it's going to go
  }

  trackfile$ = this.store.select(selectCurrentTrackFile);
  trackFiles$ = this.store.select(selectAllTrackFiles);
  scenario$ = this.store.select(selectCurrentSpacecraft);
  currentScenarioTrackFiles: TrackFile[] = [];
  latestTrackFile: any = {};

  constructor(private store: Store<AppStore>) {
    this.scenario$.subscribe((scenario) => {
      this.trackFiles$.subscribe((trackFile) => {
        if (scenario) {
          scenario.trackFileIds.forEach((id) => {
            trackFile.map((file) => {
              if (file.id.includes(id)) {
                this.currentScenarioTrackFiles.push(file);
                this.latestTrackFile = this.currentScenarioTrackFiles[0];
              }
            });
          });
        }
      });
    });
  }

  handleInput(event: any) {}

  databaseFile: string = '';
  orbitSourceFile: string = '';
  thrustProfileFile: string = '';
  processedTrackFile: string = '';

  handleSelection(event: any) {
    this.currentScenarioTrackFiles.map((file) => {
      if (file.id.includes(event.detail.value)) {
        console.log(file);
        this.databaseFile = file.name;
        this.orbitSourceFile = file.tleSourceFile.name;
        this.thrustProfileFile = file.thrustProfileFileName;
        this.processedTrackFile = file.processedTrackFile?.name as string;
      }
    });
  }
}
