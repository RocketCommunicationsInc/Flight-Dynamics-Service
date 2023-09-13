import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { UtilityToolkitComponent } from './utility-toolkit/utility-toolkit.component';
import { CommonModule } from '@angular/common';
import { InputsOutputsComponent } from './inputs-outputs/inputs-outputs.component';
import { OutputDataDisplayComponent } from './output-data-display/output-data-display.component';

@Component({
  selector: 'fds-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [
    CommonModule,
    AstroComponentsModule,
    UtilityToolkitComponent,
    InputsOutputsComponent,
    OutputDataDisplayComponent,
  ],
})
export class MainComponent {}
