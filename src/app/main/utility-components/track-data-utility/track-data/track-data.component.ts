import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import {
  NgApexchartsModule,
} from 'ng-apexcharts';
import { SitesComponent } from './sites/sites.component';
import { SettingsComponent } from './settings/settings.component';
import { TrackDataGraphComponent } from './track-data-graph/track-data-graph.component';
import { TrackDataTableComponent } from './track-data-table/track-data-table.component';

@Component({
  selector: 'fds-track-data',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    NgApexchartsModule,
    SitesComponent,
    SettingsComponent,
    TrackDataGraphComponent,
    TrackDataTableComponent
  ],
  templateUrl: './track-data.component.html',
  styleUrls: ['./track-data.component.css'],
})
export class TrackDataComponent {
  @ViewChild('trackDataGraph') trackDataGraph?: TrackDataGraphComponent|null

  //show/hide variables
  isSitesDrawerOpen: boolean = false;
  isSettingsDrawerOpen: boolean = false;
  showGraph: boolean = true;
  showTable: boolean = false;

  toggleSitesDrawer() {
    this.isSitesDrawerOpen = !this.isSitesDrawerOpen;
    this.trackDataGraph?.toggleChartSize(this.isSitesDrawerOpen)
  }

  toggleSettingsDrawer() {
    this.isSettingsDrawerOpen = !this.isSettingsDrawerOpen;
    this.trackDataGraph?.toggleChartSize(this.isSettingsDrawerOpen)
  }

  viewTable() {
    this.showGraph = false;
    this.showTable = true;
    this.isSitesDrawerOpen = false
    this.isSettingsDrawerOpen = false
  }

  viewGraph() {
    this.showGraph = true;
    this.showTable = false;
  }
}
