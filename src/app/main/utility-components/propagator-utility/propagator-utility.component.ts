import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { InputSourceComponent } from './input-source/input-source.component';
import { ViewOrbitComponent } from './view-orbit/view-orbit.component';
import type { Tabs } from 'src/app/types/Tabs';

@Component({
  selector: 'fds-propagator-util',
  standalone: true,
  imports: [
    AstroComponentsModule,
    CommonModule,
    InputSourceComponent,
    ViewOrbitComponent,
  ],
  templateUrl: './propagator-utility.component.html',
  styleUrls: ['./propagator-utility.component.css'],
})
export class PropagatorUtilityComponent {
  onCloseUtility(event: boolean) {
    console.log(event);
  }
}
