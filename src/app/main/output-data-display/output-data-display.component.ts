import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import {
  SegmentedButton,
  Status,
} from '@astrouxds/astro-web-components/dist/types/components';

import { ChildContainerComponent } from 'src/app/shared';
import { ViewGraphComponent } from './view-graph/view-graph.component';
import { ViewTableComponent } from './view-table/view-table.component';

function random(min = 10_000, max = 80_000) {
  return Math.random() * (max - min) + min;
}

type CurrentView = 'View Table' | 'View Graph';

interface OrbitDeterminations {
  message: string;
  status: Status;
  timestamp: number;
}

@Component({
  selector: 'fds-output-data-display',
  standalone: true,
  imports: [
    CommonModule,
    ChildContainerComponent,
    AstroComponentsModule,
    ViewGraphComponent,
    ViewTableComponent,
  ],
  templateUrl: './output-data-display.component.html',
  styleUrls: ['./output-data-display.component.css'],
})
export class OutputDataDisplayComponent {
  now = new Date().getTime();
  criticals: OrbitDeterminations[] = [];
  diviations: OrbitDeterminations[] = [];
  warnings: OrbitDeterminations[] = [];
  currentView: CurrentView = 'View Table';

  tabs = [
    { label: 'OD Solution', selected: true },
    { label: 'OD Performance', disabled: true },
  ];

  ods: OrbitDeterminations[] = [
    {
      message: 'OD warning message on',
      status: 'caution',
      timestamp: this.now - random(),
    },
    {
      message: 'OD critical message on',
      status: 'critical',
      timestamp: this.now - random(),
    },
    {
      message: 'OD success message on',
      status: 'normal',
      timestamp: this.now,
    },
    {
      message: 'OD success message on',
      status: 'normal',
      timestamp: this.now - random(),
    },
    {
      message: 'OD warning message on',
      status: 'caution',
      timestamp: this.now - random(),
    },
    {
      message: 'OD warning message on',
      status: 'caution',
      timestamp: this.now - random(),
    },
    {
      message: 'OD warning message on',
      status: 'caution',
      timestamp: this.now - random(),
    },
    {
      message: 'OD success message on',
      status: 'normal',
      timestamp: this.now - random(),
    },
  ];

  actions: SegmentedButton[] = [
    { label: 'Secondary Action', selected: false },
    { label: 'Primary Action', selected: true },
  ];

  views: SegmentedButton[] = [
    { label: 'View Table', selected: this.currentView === 'View Table' },
    { label: 'View Graph', selected: this.currentView === 'View Graph' },
  ];

  constructor() {
    this.criticals = this.ods.filter((od) => od.status === 'critical');
    this.diviations = this.ods.filter((od) => od.status !== 'normal');
    this.warnings = this.ods.filter((od) => od.status === 'caution');
    this.ods.sort((a, b) => b.timestamp - a.timestamp);
  }

  onSelect(e: Event) {
    const event = e as CustomEvent;
    console.log(event.detail);
  }

  setCurrentView(e: Event) {
    const event = e as CustomEvent;
    this.currentView = event.detail;
  }
}
