import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { UtilityToolkitComponent } from './utility-toolkit/utility-toolkit.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fds-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [CommonModule, AstroComponentsModule, UtilityToolkitComponent],
})
export class MainComponent {}
