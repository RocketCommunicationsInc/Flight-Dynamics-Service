import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ColumnDefs, TableService } from 'src/app/shared/table.service';
import { MultipleSwitchCaseDirective } from 'src/app/shared/multiple-switch-case.directive';
import { PerformanceData } from '../output-data-display.model';

const columnDefs: ColumnDefs<PerformanceData>[] = [
  { field: 'property', header: 'Property' },
  { field: 'initialRange', header: 'Range (Initial)', sortable: true },
  { field: 'finalRange', header: 'Range (Final)', sortable: true },
  { field: 'initialAzimuth', header: 'Azimuth (Initial)', sortable: true },
  { field: 'finalAzimuth', header: 'Azimuth (Final)', sortable: true },
  { field: 'initialElevation', header: 'Elevation (Initial)', sortable: true },
  { field: 'finalElevation', header: 'Elevation (Final)', sortable: true },
];

@Component({
  selector: 'fds-performance-table',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, MultipleSwitchCaseDirective],
  providers: [TableService],
  templateUrl: './performance-table.component.html',
  styleUrls: ['./performance-table.component.css'],
})
export class PerformanceTableComponent implements OnChanges {
  @Input({ required: true }) data: PerformanceData[] = [];

  constructor(public tableService: TableService<PerformanceData>) {}

  ngOnChanges({ data }: SimpleChanges): void {
    this.tableService.init({
      columnDefs,
      data: data.currentValue,
    });
  }

  setStatus(num: number | string) {
    if (Number(num) > 40) return 'serious';
    else return '';
  }
}
