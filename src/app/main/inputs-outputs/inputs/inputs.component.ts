import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fds-inputs',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
})
export class InputsComponent {
  inputForm = new FormGroup({
    databaseFile: new FormControl('input_file_name.abc'),
    orbitSource: new FormControl('Ephemeris'),
    epoch: new FormControl(''),
    epochRange: new FormControl(''),
    epochSpan: new FormControl(''),
    thrustProfile: new FormControl('input_file_name.abc'),
    processedTrackFile: new FormControl('input_file_name.abc'),
  });
  onSubmit(): void {
    console.log(this.inputForm.value);
    //TODO hook form data into where it's going to go
  }
}
