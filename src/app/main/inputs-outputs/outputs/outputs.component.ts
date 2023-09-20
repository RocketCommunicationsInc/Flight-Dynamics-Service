import { Component } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'fds-outputs',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
  ],
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.css'],
})
export class OutputsComponent {}
