import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { TrackFilesComponent } from 'src/app/main/utility-components/track-data-utility/track-files/track-files.component';
import { TrackDataComponent } from 'src/app/main/utility-components/track-data-utility/track-data/track-data.component';
import { Store } from '@ngrx/store';
import { selectCurrentSpacecraft } from 'src/app/+state/app.selectors';
@Component({
  selector: 'fds-track-data-util',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, TrackFilesComponent, TrackDataComponent],
  templateUrl: './track-data-utility.component.html',
  styleUrls: ['./track-data-utility.component.css'],
})
export class TrackDataUtilityComponent {
  currentSpacecraft$ = this.store.select(selectCurrentSpacecraft)
  selectedTab: string = 'files';

  constructor(private store: Store){}

  tabSelect(event: any) {
    if (event.target.id) {
      this.selectedTab = event.target.id;
    }
  }
}
