import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
@Component({
  selector: 'fds-input-source',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './input-source.component.html',
  styleUrls: ['./input-source.component.css'],
})
export class InputSourceComponent {
  showControlsPanel: boolean = false;

  toggleControls() {
    this.showControlsPanel = !this.showControlsPanel;
  }
}
