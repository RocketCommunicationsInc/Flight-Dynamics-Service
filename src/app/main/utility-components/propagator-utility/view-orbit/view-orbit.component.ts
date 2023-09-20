import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AstroComponentsModule } from '@astrouxds/angular'
@Component({
  selector: 'fds-view-orbit',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './view-orbit.component.html',
  styleUrls: ['./view-orbit.component.css'],
})
export class ViewOrbitComponent {}
