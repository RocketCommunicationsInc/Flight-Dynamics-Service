import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { UtilityToolkitComponent } from './utility-toolkit/utility-toolkit.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputsOutputsDataDisplayComponent } from './inputs-outputs-data-display/inputs-outputs-data-display.component';

@Component({
  selector: 'fds-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    AstroComponentsModule,
    UtilityToolkitComponent,
    InputsOutputsDataDisplayComponent,
  ],
})
export class MainComponent {}
