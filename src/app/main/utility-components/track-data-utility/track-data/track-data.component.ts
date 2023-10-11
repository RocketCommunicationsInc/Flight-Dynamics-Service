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
import { CustomSegmentedButtonComponent } from 'src/app/shared/custom-segmented-button/custom-segmented-button.component';

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
    TrackDataTableComponent,
    CustomSegmentedButtonComponent
  ],
  templateUrl: './track-data.component.html',
  styleUrls: ['./track-data.component.css'],
})
export class TrackDataComponent {
  @ViewChild('trackDataGraph') trackDataGraph?: TrackDataGraphComponent|null

  //show/hide variables
  isSitesDrawerOpen: boolean = false;
  isSettingsDrawerOpen: boolean = false;
  leftIcon: string = 'notes';
  leftText: string = 'Graph';
  rightIcon: string = 'show-chart';
  rightText: string = 'Table';
  leftBtnActive: boolean = true;
  rightBtnActive: boolean = false;

  toggleSitesDrawer() {
    this.isSitesDrawerOpen = !this.isSitesDrawerOpen;
    this.trackDataGraph?.toggleChartSize(this.isSitesDrawerOpen)
  }

  toggleSettingsDrawer() {
    this.isSettingsDrawerOpen = !this.isSettingsDrawerOpen;
    this.trackDataGraph?.toggleChartSize(this.isSettingsDrawerOpen)
  }

  viewTable() {
    this.isSitesDrawerOpen = false
    this.isSettingsDrawerOpen = false
    this.leftBtnActive = false
    this.rightBtnActive = true

  }

  viewGraph() {
    this.leftBtnActive = true;
    this.rightBtnActive = false;
  }
}
