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

  trackFiles$ = this.store.select(selectAllTrackFiles);
  scenario$ = this.store.select(selectCurrentSpacecraft);
  currentScenarioTrackFiles: TrackFile[] = [];

  constructor(private store: Store<AppStore>) {
    this.scenario$.subscribe((scenario) => {
      this.trackFiles$.subscribe((trackFile) => {
        if (scenario) {
          scenario.trackFileIds.forEach((id) => {
            trackFile.map((file) => {
              if (file.id.includes(id)) {
                this.currentScenarioTrackFiles.push(file);
              }
            });
          });
        }
      });
    });
  }

  isValue: boolean = false;
  results: any[] = [];
  noResults: boolean = false;

  databaseFile: string = '';
  orbitSourceFile: string = '';
  thrustProfileFile: string = '';
  processedTrackFile: string = '';
  isDisabled: boolean = true;
  latestTrackFile: any = {};
  noLatestTrackFile: boolean = true;

  handleInput(event: any) {
    this.results = [];
    if (event.target.value === '') {
      this.databaseFile = '';
      this.orbitSourceFile = '';
      this.thrustProfileFile = '';
      this.processedTrackFile = '';
    }
    if (event.target.value !== '') {
      this.isValue = true;
      this.currentScenarioTrackFiles.filter((file) => {
        if (file.name.includes(event.target.value)) {
          this.results.push(file);
        } else this.noResults = true;
      });
    } else {
      this.isValue = false;
      this.isDisabled = true;
    }
  }

  handleSelection(event: any) {
    this.currentScenarioTrackFiles.map((file) => {
      if (file.id.includes(event.detail.value)) {
        this.latestTrackFile = file;
        this.isDisabled = false;
        this.noLatestTrackFile = false;
        this.databaseFile = file.name;
        this.orbitSourceFile = file.tleSourceFile.name;
        this.thrustProfileFile = file.thrustProfileFileName;
        this.processedTrackFile = file.processedTrackFile?.name as string;
      }
    });
  }
}
