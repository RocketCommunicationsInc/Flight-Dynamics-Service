import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ViewOrbitTableService } from '../view-orbit-table.service';
import { TableService } from 'src/app/shared/table.service';
import type { EphemerisFile } from 'src/app/types/data.types';
@Component({
  selector: 'fds-view-table',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  providers: [TableService],
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css'],
})
export class ViewTableComponent {
  constructor(
    public tableService: TableService<EphemerisFile>,
    public viewOrbitTableService: ViewOrbitTableService
  ) {
    this.tableService.init({
      columnDefs: this.viewOrbitTableService.columnDefs,
      data: this.viewOrbitTableService.ephemerisData,
    });
  }
}
