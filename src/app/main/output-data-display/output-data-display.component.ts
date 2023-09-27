import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { SegmentedButton } from '@astrouxds/astro-web-components/dist/types/components';

import type { Tabs } from 'src/app/types/Tabs';
import { ChildContainerComponent } from 'src/app/shared';
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
    ChildContainerComponent,
    AstroComponentsModule,
    SolutionGraphComponent,
    SolutionTableComponent,
    PerformanceTableComponent,
  ],
  templateUrl: './output-data-display.component.html',
  styleUrls: ['./output-data-display.component.css'],
})
export class OutputDataDisplayComponent {
  currentTab = 'od-solution';
  currentView: CurrentView = 'View Table';

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

  constructor(public outputDataDisplayService: OutputDataDisplayService) {}

  get isSolutionTab() {
    return this.currentTab === 'od-solution';
  }

  get isPerformanceTab() {
    return this.currentTab === 'od-performance';
  }

  setCurrentView(e: Event) {
    const event = e as CustomEvent;
    this.currentView = event.detail;
  }

  setCurrentTab(id: string) {
    this.currentTab = id;
  }
}
