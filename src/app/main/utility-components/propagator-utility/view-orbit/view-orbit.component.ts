import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { PropagatorControlsComponent } from '../propagator-controls/propagator-controls.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { ViewModelComponent } from './view-model/view-model.component';
@Component({
  selector: 'fds-view-orbit',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    PropagatorControlsComponent,
    ViewTableComponent,
    ViewModelComponent,
  ],
  templateUrl: './view-orbit.component.html',
  styleUrls: ['./view-orbit.component.css'],
})
export class ViewOrbitComponent {
  toggleControls() {
    this.showControlsPanel = !this.showControlsPanel;
  }

  showControlsPanel: boolean = false;
  showModel: boolean = true;

  viewTable() {
    this.showModel = false;
  }

  viewModel() {
    this.showModel = true;
  }
}
