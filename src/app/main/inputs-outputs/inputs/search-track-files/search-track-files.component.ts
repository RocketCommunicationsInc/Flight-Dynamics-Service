import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Store } from '@ngrx/store';
import {
  TrackFilesActions,
  ScenariosActions,
} from 'src/app/+state/app.actions';
import { AppStore } from 'src/app/+state/app.model';
import {
  selectAllTrackFiles,
  selectCurrentSpacecraft,
  selectCurrentTrackFile,
} from 'src/app/+state/app.selectors';
import { TrackFile } from 'src/app/types/data.types';

@Component({
  selector: 'fds-search-track-files',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './search-track-files.component.html',
  styleUrls: ['./search-track-files.component.css'],
})
export class SearchTrackFilesComponent {
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

  ngOnInit() {
    console.log(this.currentScenarioTrackFiles, 'files');
    //console.log(this.trackfile$, 'trackfile');
  }

  selectedTrackFile: any = '';

  captureInput(event: any) {
    console.log(event.target.value);
    event.target.value = this.selectedTrackFile;
  }

  currentValue: any = '';

  handleSelection(event: any) {
    this.currentScenarioTrackFiles.map((file) => {
      if (file.id.includes(event.detail.value)) {
        this.currentValue = file.name;
      }
    });
  }
}
