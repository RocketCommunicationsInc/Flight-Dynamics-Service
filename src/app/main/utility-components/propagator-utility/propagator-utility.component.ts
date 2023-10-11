import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { InputSourceComponent } from './input-source/input-source.component';
import { ViewOrbitComponent } from './view-orbit/view-orbit.component';
import { TabbedChildContainerComponent } from 'src/app/shared/tabbed-child-container/tabbed-child-container.component';
import { Tabs } from 'src/app/types/Tabs';

@Component({
  selector: 'fds-propagator-util',
  standalone: true,
  imports: [
    AstroComponentsModule,
    TabbedChildContainerComponent,
    CommonModule,
    InputSourceComponent,
    ViewOrbitComponent,
  ],
  templateUrl: './propagator-utility.component.html',
  styleUrls: ['./propagator-utility.component.css'],
})
export class PropagatorUtilityComponent {
  tabs: Tabs[] = [
    { label: 'Input Source', id: 'input-source', selected: true },
    { label: 'View Orbit', id: 'view-orbit', selected: false },
  ];
}
