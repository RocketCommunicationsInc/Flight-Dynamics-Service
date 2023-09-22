import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

import { OutputDataDisplayService } from '../output-data-display.service';

@Component({
  selector: 'fds-view-table',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css'],
})
export class ViewTableComponent {
  // @Input({ required: true })
  // outputDataDisplayService: OutputDataDisplayService =
  //   new OutputDataDisplayService();

  constructor(public outputDataDisplayService: OutputDataDisplayService) {}
}
