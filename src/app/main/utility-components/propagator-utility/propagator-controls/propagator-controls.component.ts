import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'fds-propagator-controls',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './propagator-controls.component.html',
  styleUrls: ['./propagator-controls.component.css'],
})
export class PropagatorControlsComponent {
  @Input() showControlsPanel: boolean = false;
}
