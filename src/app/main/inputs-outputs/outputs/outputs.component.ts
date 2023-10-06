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
export class OutputsComponent {}
