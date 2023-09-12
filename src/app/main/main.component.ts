import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'fds-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [AstroComponentsModule],
})
export class MainComponent {}
