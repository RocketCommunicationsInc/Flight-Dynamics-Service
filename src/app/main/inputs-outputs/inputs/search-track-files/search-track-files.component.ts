import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Store } from '@ngrx/store';
import {
  TrackFilesActions,
  ScenariosActions,
} from 'src/app/+state/app.actions';
import {
  AppStore,
  ScenariosState,
  TrackFilesState,
} from 'src/app/+state/app.model';
import { Observable } from 'rxjs';
import {
  selectAllSpacecrafts,
  selectAllTrackFiles,
  selectCurrentTrackFile,
  selectScenarios,
  selectSelectedSpacecraftId,
} from 'src/app/+state/app.selectors';
import { Spacecraft } from 'src/app/types/data.types';

@Component({
  selector: 'fds-search-track-files',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './search-track-files.component.html',
  styleUrls: ['./search-track-files.component.css'],
})
export class SearchTrackFilesComponent {
  scenarios$: Observable<ScenariosState>;
  spacecrafts$: Observable<Spacecraft[]>;
  //trackfiles$: Observable<TrackFilesState>
  trackfile$: Observable<TrackFilesState>;

  constructor(private store: Store<AppStore>) {
    this.scenarios$ = this.store.select(selectScenarios);
    // this.selectedSpacecraftId$ = this.store.select(selectSelectedSpacecraftId);
    this.spacecrafts$ = this.store.select(selectAllSpacecrafts);
    //this.trackfiles$ = this.store.select(selectAllTrackFiles)
    this.trackfile$ = this.store.select(selectCurrentTrackFile);
  }

  ngOnInit() {
    console.log(this.trackfile$, 'trackfile');
    //   this.scenarios$.subscribe((res: any) => {
    //     this.scenarios = res.ids.map((id: string) => {
    //       return res.entities[id];
    //     });
    //   });
    //   this.store.dispatch(
    //     ScenariosActions.scenarioSelected({
    //       scenarioId: this.scenarios[0]!.id,
    //     })
    //   );
    // }
  }

  handleSelection(event: any) {
    if (event.detail.value) {
      console.log(event.detail.value, 'val');
    }
  }
}
