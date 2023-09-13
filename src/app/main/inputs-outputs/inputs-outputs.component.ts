import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildContainerComponent } from 'src/app/shared/child-container/child-container.component';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'fds-inputs-outputs',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, ChildContainerComponent],
  templateUrl: './inputs-outputs.component.html',
  styleUrls: ['./inputs-outputs.component.css'],
})
export class InputsOutputsComponent {}
