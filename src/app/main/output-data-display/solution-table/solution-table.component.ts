import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

import { TableService } from 'src/app/shared/table.service';
import { OutputDataDisplayService } from '../output-data-display.service';
import { SummaryData } from '../output-data-display.model';

@Component({
  selector: 'fds-solution-table',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  providers: [TableService],
  templateUrl: './solution-table.component.html',
  styleUrls: ['./solution-table.component.css'],
})
export class SolutionTableComponent {
  constructor(
    public tableService: TableService<SummaryData>,
    public outputDataDisplayService: OutputDataDisplayService
  ) {
    this.tableService.init({
      columnDefs: this.outputDataDisplayService.columnDefs,
      data: this.outputDataDisplayService.summaryData,
    });
  }
}
