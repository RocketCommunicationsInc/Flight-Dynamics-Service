import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { SegmentedButton } from '@astrouxds/astro-web-components/dist/types/components';

import type { Tabs } from 'src/app/types/Tabs';
import { TabbedChildContainerComponent } from 'src/app/shared';
import { SolutionGraphComponent } from './solution-graph/solution-graph.component';
import { SolutionTableComponent } from './solution-table/solution-table.component';
import { OutputDataDisplayService } from './output-data-display.service';
import { CurrentView } from './output-data-display.model';
import { PerformanceTableComponent } from './performance-table/performance-table.component';

@Component({
  selector: 'fds-output-data-display',
  standalone: true,
  imports: [
    CommonModule,
    TabbedChildContainerComponent,
    AstroComponentsModule,
    SolutionGraphComponent,
    SolutionTableComponent,
    PerformanceTableComponent,
  ],
  templateUrl: './output-data-display.component.html',
  styleUrls: ['./output-data-display.component.css'],
})
export class OutputDataDisplayComponent {
  constructor(public outputDataDisplayService: OutputDataDisplayService) {}

  currentView: CurrentView = 'View Table';
  hasNotification = true;
  notificationData = [
    {
      message: 'OD success message on 9/25/23, 10:20 AM',
      status: 'normal',
    },
  ];
  tabs: Tabs[] = [
    { label: 'OD Solution', id: 'od-solution', selected: true },
    { label: 'OD Performance', id: 'od-performance' },
  ];

  actions: SegmentedButton[] = [
    { label: 'Secondary Action' },
    { label: 'Primary Action', selected: true },
  ];

  views: SegmentedButton[] = [
    { label: 'View Table', selected: true },
    { label: 'View Graph' },
  ];

  setCurrentView(e: Event) {
    const event = e as CustomEvent;
    this.currentView = event.detail;
  }

  @HostListener('ruxselected', ['$event'])
  onRuxSelected(e: any) {
    if (e.detail.id === 'od-performance') {
      this.hasNotification = false;
    } else {
      this.hasNotification = true;
    }
  }
}
