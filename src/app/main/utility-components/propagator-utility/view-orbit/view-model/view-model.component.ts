import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { PropagatorControlsComponent } from '../../propagator-controls/propagator-controls.component';
import { CesiumMapDirective } from './cesium-map.directive';

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
  showControlsPanel: boolean = false;
  zoomLevel: number = 18000000;

  handleZoom(event: any) {
    this.zoomLevel = event.target.value;
  }

  toggleControls() {
    console.log('showControls');
    this.showControlsPanel = !this.showControlsPanel;
  }
}
