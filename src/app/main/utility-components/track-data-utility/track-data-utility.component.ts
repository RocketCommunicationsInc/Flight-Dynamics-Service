import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { TrackFilesComponent } from 'src/app/track-files/track-files.component';
import { TrackDataComponent } from 'src/app/track-data/track-data.component';
@Component({
  selector: 'fds-track-data-util',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, TrackFilesComponent, TrackDataComponent],
  templateUrl: './track-data-utility.component.html',
  styleUrls: ['./track-data-utility.component.css'],
})
export class TrackDataUtilityComponent {
  selectedTab: string = 'files';

  tabSelect(event: any) {
    if (event.target.id) {
      this.selectedTab = event.target.id;
    }
  }
}
