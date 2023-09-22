import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { SegmentedButton } from '@astrouxds/astro-web-components/dist/types/components';

import type { Tabs } from 'src/app/types/Tabs';
import { TabbedChildContainerComponent } from 'src/app/shared';
import { ViewGraphComponent } from './view-graph/view-graph.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { OutputDataDisplayService } from './output-data-display.service';
import { CurrentView } from './output-data-display.model';

@Component({
  selector: 'fds-output-data-display',
  standalone: true,
  imports: [
    CommonModule,
    TabbedChildContainerComponent,
    AstroComponentsModule,
    ViewGraphComponent,
    ViewTableComponent,
  ],
  templateUrl: './output-data-display.component.html',
  styleUrls: ['./output-data-display.component.css'],
})
export class OutputDataDisplayComponent {
  tabsId = 'ods-display';
  currentView: CurrentView = 'View Table';

  tabs: Tabs[] = [
    { label: 'OD Solution', id: 'od-solution', selected: true },
    { label: 'OD Performance', id: 'od-performance', disabled: true },
  ];

  actions: SegmentedButton[] = [
    { label: 'Secondary Action', selected: false },
    { label: 'Primary Action', selected: true },
  ];

  views: SegmentedButton[] = [
    { label: 'View Table', selected: this.currentView === 'View Table' },
    { label: 'View Graph', selected: this.currentView === 'View Graph' },
  ];

  constructor(public outputDataDisplayService: OutputDataDisplayService) {}

  setCurrentView(e: Event) {
    const event = e as CustomEvent;
    this.currentView = event.detail;
  }
}
