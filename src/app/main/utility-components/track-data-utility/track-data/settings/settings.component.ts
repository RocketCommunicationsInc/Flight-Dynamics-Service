import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'fds-settings',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  @Input() isSettingsDrawerOpen: boolean = false;
}
