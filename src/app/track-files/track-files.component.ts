import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { dummyFileData } from './dummy-file-data';

@Component({
  selector: 'fds-track-files',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './track-files.component.html',
  styleUrls: ['./track-files.component.css']
})
export class TrackFilesComponent {
dummyFileData = dummyFileData
}
