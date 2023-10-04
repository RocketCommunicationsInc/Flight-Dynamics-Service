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

  actions: SegmentedButton[] = [
    { label: 'Secondary Action' },
    { label: 'Primary Action', selected: true },
  ];

  views: SegmentedButton[] = [
    { label: 'View Table', selected: true },
    { label: 'View Graph' },
  ];

  constructor(public outputDataDisplayService: OutputDataDisplayService) {}

  setCurrentView(e: Event) {
    const event = e as CustomEvent;
    this.currentView = event.detail;
  }

  onSelect(event: any) {
    const target = event.target.value;
    const cumulativeSection = document?.getElementById('cumulative');
    const pass1Section = document?.getElementById('pass1');
    const pass2Section = document?.getElementById('pass2');
    const pass3Section = document?.getElementById('pass3');

    if (target === 'cumulative' && cumulativeSection) {
      cumulativeSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (target === 'pass1' && pass1Section) {
      pass1Section.scrollIntoView({ behavior: 'smooth' });
    }
    if (target === 'pass2' && pass2Section) {
      pass2Section.scrollIntoView({ behavior: 'smooth' });
    }
    if (target === 'pass3' && pass3Section) {
      pass3Section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
