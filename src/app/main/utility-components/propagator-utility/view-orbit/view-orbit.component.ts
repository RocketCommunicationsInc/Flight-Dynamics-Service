import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { PropagatorControlsComponent } from '../propagator-controls/propagator-controls.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { ViewModelComponent } from './view-model/view-model.component';
import { CustomSegmentedButtonComponent } from 'src/app/shared/custom-segmented-button/custom-segmented-button.component';
import { ToastService } from 'src/app/shared/toast.service';
@Component({
  selector: 'fds-view-orbit',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    PropagatorControlsComponent,
    ViewTableComponent,
    ViewModelComponent,
    CustomSegmentedButtonComponent,
  ],
  templateUrl: './view-orbit.component.html',
  styleUrls: ['./view-orbit.component.css'],
})
export class ViewOrbitComponent {
  showControlsPanel: boolean = false;
  showModel: boolean = true;
  leftIcon = 'public';
  leftText = 'Model';
  rightIcon = 'show-chart';
  rightText = 'Table';
  leftBtnActive: boolean = true;
  rightBtnActive: boolean = false;

  toggleControls() {
    this.showControlsPanel = !this.showControlsPanel;
  }

  viewTable() {
    this.showModel = false;
    this.leftBtnActive = false;
    this.rightBtnActive = true;
  }

  viewModel() {
    this.showModel = true;
    this.leftBtnActive = true;
    this.rightBtnActive = false;
  }

  constructor(private toast: ToastService) {}

  onClick() {
    this.toast.defaultToast();
  }
}
