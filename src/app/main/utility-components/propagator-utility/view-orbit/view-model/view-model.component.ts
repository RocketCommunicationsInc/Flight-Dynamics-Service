import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { PropagatorControlsComponent } from '../../propagator-controls/propagator-controls.component';
import { CesiumMapDirective } from './cesium-map.directive';
import {
  selectCurrentTrackFile,
  selectCurrentTrackFileEphemerisData,
} from 'src/app/+state/app.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import type { TrackFile, EphemerisFile } from 'src/app/types/data.types';

@Component({
  selector: 'fds-view-model',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    PropagatorControlsComponent,
    CesiumMapDirective,
  ],
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css'],
})
export class ViewModelComponent {
  ephemData$: Observable<EphemerisFile | null> = this.store.select(
    selectCurrentTrackFileEphemerisData
  );
  trackFile$: Observable<TrackFile | null> = this.store.select(
    selectCurrentTrackFile
  );
  showControlsPanel: boolean = false;
  zoomLevel: number = 36_000_000;

  constructor(private store: Store) {}

  handleZoom(event: any) {
    this.zoomLevel = event.target.value;
  }

  toggleControls() {
    this.showControlsPanel = !this.showControlsPanel;
  }

  onMetersFromEarthChange(newMetersFromEarth: number) {
    this.zoomLevel = newMetersFromEarth;
  }
}
