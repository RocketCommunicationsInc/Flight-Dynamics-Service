import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildContainerComponent } from 'src/app/shared/child-container/child-container.component';
import { AstroComponentsModule } from '@astrouxds/angular';
import { InputsComponent } from './inputs/inputs.component';
import { OutputsComponent } from './outputs/outputs.component';

@Component({
  selector: 'fds-inputs-outputs',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    ChildContainerComponent,
    InputsComponent,
    OutputsComponent,
  ],
  templateUrl: './inputs-outputs.component.html',
  styleUrls: ['./inputs-outputs.component.css'],
})
export class InputsOutputsComponent {}
