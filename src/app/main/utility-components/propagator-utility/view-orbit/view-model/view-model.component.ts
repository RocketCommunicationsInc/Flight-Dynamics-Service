import {
  AfterContentInit,
  Component,
  HostListener,
  OnDestroy,
} from '@angular/core';
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
import { TrackFile } from 'src/app/types/data.types';

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
  ephemData$: Observable<{ [key: string]: number } | null> = this.store.select(
    selectCurrentTrackFileEphemerisData
  );
  trackFile$: Observable<TrackFile | null> = this.store.select(
    selectCurrentTrackFile
  );
  showControlsPanel: boolean = false;
  zoomLevel: number = 36_000_000;
  scrolling: 'up' | 'down' | null = null;

  constructor(private store: Store) {}

  @HostListener('wheel', ['$event']) wheelEvent(e: WheelEvent) {
    if (e.deltaY < 0) {
      this.scrolling = 'up';
    }

    if (e.deltaY > 0) {
      this.scrolling = 'down';
    }
  }

  handleZoom(event: any) {
    this.zoomLevel = event.target.value;
  }

  toggleControls() {
    this.showControlsPanel = !this.showControlsPanel;
  }

  onCameraScrollChange(changePercentage: number) {
    const diff = 36_000_000 * (changePercentage / 1000);
    // const diff = this.zoomLevel * (changePercentage / 100);
    console.log('start', this.zoomLevel, diff, changePercentage / 1000);
    if (this.scrolling === 'up') {
      const newZoomLevel = this.zoomLevel - diff;
      this.zoomLevel = newZoomLevel < 0 ? 0 : newZoomLevel;
    }

    if (this.scrolling === 'down') {
      const newZoomLevel = this.zoomLevel + diff;
      this.zoomLevel = newZoomLevel > 36_000_000 ? 36_000_000 : newZoomLevel;
    }

    console.log('end', this.zoomLevel);
  }
}
