import { Component, DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { SitesComponent } from '../sites/sites.component';
import { SettingsComponent } from '../settings/settings.component';
import { TrackFile } from 'src/app/types/data.types';
import { TrackData, TrackFilesDataUtilityService } from '../../track-files-data.service';
import { Column, ColumnDefs, TableService } from 'src/app/shared/table.service';

@Component({
  selector: 'fds-track-data-table',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    SitesComponent,
    SettingsComponent,
  ],
  templateUrl: './track-data-table.component.html',
  styleUrls: ['./track-data-table.component.css'],
})
export class TrackDataTableComponent {
  tableColumns: Column<TrackData>[]

  constructor(public trackFilesService: TrackFilesDataUtilityService){
    this.tableColumns = trackFilesService.tableService.columns.filter(column => column.field !== 'id')
  }

}
