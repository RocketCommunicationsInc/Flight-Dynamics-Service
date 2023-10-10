import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { PropagatorControlsComponent } from '../propagator-controls/propagator-controls.component';
import { ToastService } from 'src/app/shared/toast.service';
@Component({
  selector: 'fds-input-source',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, PropagatorControlsComponent],
  templateUrl: './input-source.component.html',
  styleUrls: ['./input-source.component.css'],
})
export class InputSourceComponent {
  constructor(private toasts: ToastService) {}

  showControlsPanel: boolean = false;

  toggleControls() {
    this.showControlsPanel = !this.showControlsPanel;
  }

  handleSettings() {
    this.toasts.addToast({
      message: 'Settings saved',
      hideClose: false,
      closeAfter: 3000,
    });
  }

  handleCancel() {
    this.toasts.defaultToast()
  }

  showEphemFiles: boolean = false;

  handleSelectMenu(event: any) {
    if (event.target.value === 'Ephem') {
      this.showEphemFiles = true;
    } else this.showEphemFiles = false;
  }

  selectedMenuItem: string = '';

  handlePopup(event: Event) {
    this.selectedMenuItem = (event as CustomEvent).detail.value;
  }

  TLEFiles = [
    'tle_12242019_1.tle',
    'tle_08142020_2.tle',
    'tle_10172021_3.tle',
    'tle_01222022_4.tle',
    'tle_12132023_5.tle',
  ];

  EphemFiles = [
    'eph_12242019_1.ephm',
    'eph_08142020_2.ephm',
    'eph_10172021_3.ephm',
    'eph_01222022_4.ephm',
    'eph_12132023_5.ephm',
  ];
}
