import { Component, DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { SitesComponent } from '../sites/sites.component';
import { SettingsComponent } from '../settings/settings.component';
import { Store } from '@ngrx/store';
import { selectCurrentSpaceCraftTrackFiles } from 'src/app/+state/app.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrackFile } from 'src/app/types/data.types';
import { TrackFilesTableService } from '../../track-files-table.service';


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

  selectedTrackFiles$ = this.store.select(selectCurrentSpaceCraftTrackFiles)
  selectedTrackFiles: TrackFile[] = []

  //table variables
  columnDefs = [
    { header: 'File Name', field: 'name', sortable: true },
    { header: 'Date', field: 'creationDate', sortable: true },
    { header: 'File Size', field: 'fileSize', sortable: true },
  ];

  //subscription cleanup
  destroyRef = inject(DestroyRef)
  destroyed = new Subject();

  constructor(private store: Store, public trackFilesTableService: TrackFilesTableService){
    this.selectedTrackFiles$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.selectedTrackFiles = res || []
    })
  }

  ngOnInit(){
    this.trackFilesTableService.initialize(this.selectedTrackFiles, this.columnDefs);
  }

  ngOnDestroy(){
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
