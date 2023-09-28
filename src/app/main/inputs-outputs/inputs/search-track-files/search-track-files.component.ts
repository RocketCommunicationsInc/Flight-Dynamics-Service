import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'fds-search-track-files',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './search-track-files.component.html',
  styleUrls: ['./search-track-files.component.css']
})
export class SearchTrackFilesComponent {

}
