import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'fds-track-data',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './track-data.component.html',
  styleUrls: ['./track-data.component.css']
})
export class TrackDataComponent {

}
