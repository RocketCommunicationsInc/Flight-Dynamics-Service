import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ColumnDefs, TableService } from 'src/app/shared/table.service';
import type { Ephemeride, TrackFile } from 'src/app/types/data.types';
import { selectCurrentTrackFile } from 'src/app/+state/app.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
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
    private store: Store,
    public tableService: TableService<Ephemeride>
  ) {}

  columnDefs: ColumnDefs<Ephemeride>[] = [
    { header: 'Epoch', field: 'epoch', sortable: true },
    { header: 'Position X', field: 'positionX' },
    { header: 'Position Y', field: 'positionY' },
    { header: 'Position Z', field: 'positionZ' },
    { header: 'Velocity X', field: 'velocityX' },
    { header: 'Velocity Y', field: 'velocityY' },
    { header: 'Velocity Z', field: 'velocityZ' },
  ];

  currentTrackFile$: Subscription = this.store
    .select(selectCurrentTrackFile)
    .pipe(takeUntilDestroyed())
    .subscribe((trackFile: TrackFile | null) => {
      this.tableService.init({
        columnDefs: this.columnDefs,
        data: trackFile!.ephemerisSourceFile!.ephemerides,
      });
    });
}
