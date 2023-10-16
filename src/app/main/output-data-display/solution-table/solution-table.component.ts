import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule, RuxSelect } from '@astrouxds/angular';
import { UnitConverterPipe } from 'src/app/shared';
import { TableService } from 'src/app/shared/table.service';
import { Unit, RelevantUnits } from 'src/app/shared/units/units.model';
import { OutputDataDisplayService } from '../output-data-display.service';
import { SolutionData } from '../output-data-display.model';
import { capitalize } from 'src/app/shared/utils';

@Component({
  selector: 'fds-solution-table',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, UnitConverterPipe],
  providers: [TableService],
  templateUrl: './solution-table.component.html',
  styleUrls: ['./solution-table.component.css'],
})
export class SolutionTableComponent implements OnChanges {
  @Input() data: SolutionData[] = [];
  constructor(
    public tableService: TableService<SolutionData>,
    public outputDataDisplayService: OutputDataDisplayService
  ) {}

  ngOnChanges({ data }: SimpleChanges) {
    this.tableService.init({
      columnDefs: this.outputDataDisplayService.columnDefs,
      data: data.currentValue,
    });
  }

  capitalize = capitalize;
  relUnits = RelevantUnits;

  getRowUnit(row: SolutionData): Unit {
    const selected = row.units.find((unit) => unit.selected);
    return selected?.val || 'km';
  }

  setRowUnit(e: Event, row: SolutionData) {
    const event = e.target as HTMLRuxSelectElement;
    const newUnit = event.value as Unit;
    row.units.forEach((unit) => {
      unit.selected = unit.val === newUnit;
    });
  }
}
