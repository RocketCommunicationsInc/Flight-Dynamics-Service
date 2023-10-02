import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { SegmentedButton } from '@astrouxds/astro-web-components/dist/types/components';

import type { Tabs } from 'src/app/types/Tabs';
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
    AstroComponentsModule,
    SolutionGraphComponent,
    SolutionTableComponent,
    PerformanceTableComponent,
  ],
  templateUrl: './output-data-display.component.html',
  styleUrls: ['./output-data-display.component.css'],
})
export class OutputDataDisplayComponent {
  currentView: CurrentView = 'View Table';
  tabsId = 'output-data-display-tabs';
  tabs: Tabs[] = [
    { label: 'OD Solution', id: 'od-solution', selected: true },
    { label: 'OD Performance', id: 'od-performance' },
  ];

  constructor(public outputDataDisplayService: OutputDataDisplayService) {}

  showGraph: boolean = false;
  showTable: boolean = true;

  viewTable() {
    this.showGraph = false;
    this.showTable = true;
  }

  viewGraph() {
    this.showGraph = true;
    this.showTable = false;
  }
}
