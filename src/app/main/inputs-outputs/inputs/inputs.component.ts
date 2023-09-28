import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchTrackFilesComponent } from './search-track-files/search-track-files.component';
@Component({
  selector: 'fds-inputs',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    ReactiveFormsModule,
    SearchTrackFilesComponent,
  ],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
})
export class InputsComponent {
  inputForm = new FormGroup({
    databaseFile: new FormControl(''),
    orbitSource: new FormControl(''),
    epoch: new FormControl(''),
    epochRange: new FormControl(''),
    epochSpan: new FormControl(''),
    thrustProfile: new FormControl(''),
    processedTrackFile: new FormControl(''),
  });
  notificationActive = true;

  onSubmit(): void {
    console.log(this.inputForm.value);
    //TODO hook form data into where it's going to go
  }
}
