import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import type { Tabs } from 'src/app/types/Tabs';
import { SolutionGraphComponent } from './solution-graph/solution-graph.component';
import { SolutionTableComponent } from './solution-table/solution-table.component';
import { OutputDataDisplayService } from './output-data-display.service';
import { CurrentView } from './output-data-display.model';
import { PerformanceTableComponent } from './performance-table/performance-table.component';
import { ToastService } from 'src/app/shared/toast.service';

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
export class OutputDataDisplayComponent implements OnInit {
  currentView: CurrentView = 'View Table';
  tabsId = 'output-data-display-tabs';
  tabs: Tabs[] = [
    { label: 'OD Solution', id: 'od-solution', selected: true },
    { label: 'OD Performance', id: 'od-performance' },
  ];

  showBanner: boolean = false;
  dateAndTime = new Date();

  ngOnInit(): void {
    this.bannerService.showBanner$.subscribe((visible) => {
      this.showBanner = visible;
      if (visible) {
        setTimeout(() => {
          this.showBanner = false;
        }, 8000);
      }
    });
  }

  constructor(
    public outputDataDisplayService: OutputDataDisplayService,
    private toasts: ToastService,
    private bannerService: OutputDataDisplayService
  ) {}

  handleTLE() {
    this.toasts.addToast({
      message: 'TLE Created',
      hideClose: false,
      closeAfter: 3000,
    });
  }

  handleEphemeris() {
    this.toasts.addToast({
      message: 'Ephemeris Created',
      hideClose: false,
      closeAfter: 3000,
    });
  }

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
