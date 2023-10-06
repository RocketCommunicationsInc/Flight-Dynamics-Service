import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'fds-outputs',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, ReactiveFormsModule],
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.css'],
})
export class OutputsComponent {
  outputsOptions = [
    { label: 'OD Report', checked: true },
    { label: 'CMOC EPHEMERIS', checked: true },
    { label: 'TLE', checked: false },
    { label: 'Polynomial', checked: false },
    { label: 'Eclipse and Visibility', checked: false },
    { label: 'MGL', checked: true },
    { label: 'Attitude Determination' },
    { label: 'Parameter History', checked: true },
    { label: 'Norad Estimation', checked: true },
    { label: 'Ephemeris Reports', checked: false },
    { label: 'Composite Event', checked: false },
    { label: 'LM12', checked: false },
    { label: 'UEM', checked: false },
  ];
}
