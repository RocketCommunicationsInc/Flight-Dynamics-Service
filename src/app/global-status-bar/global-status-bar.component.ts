import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  standalone: true,
  selector: 'app-global-status-bar',
  templateUrl: './global-status-bar.component.html',
  styleUrls: ['./global-status-bar.component.css'],
  imports: [AstroComponentsModule],
})
export class GlobalStatusBarComponent {}
