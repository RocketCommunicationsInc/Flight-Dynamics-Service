import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsOutputsComponent } from '../inputs-outputs/inputs-outputs.component';
import { OutputDataDisplayComponent } from '../output-data-display/output-data-display.component';

@Component({
  selector: 'fds-inputs-outputs-data-display',
  standalone: true,
  imports: [CommonModule, InputsOutputsComponent, OutputDataDisplayComponent],
  templateUrl: './inputs-outputs-data-display.component.html',
  styleUrls: ['./inputs-outputs-data-display.component.css'],
})
export class InputsOutputsDataDisplayComponent {}
