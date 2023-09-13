import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildContainerComponent } from 'src/app/shared';

@Component({
  selector: 'fds-output-data-display',
  standalone: true,
  imports: [CommonModule, ChildContainerComponent],
  templateUrl: './output-data-display.component.html',
  styleUrls: ['./output-data-display.component.css'],
})
export class OutputDataDisplayComponent {}
