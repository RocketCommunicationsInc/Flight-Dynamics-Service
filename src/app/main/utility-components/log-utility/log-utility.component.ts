import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'fds-log-utility',
  templateUrl: './log-utility.component.html',
  styleUrls: ['./log-utility.component.css'],
  imports: [AstroComponentsModule, RouterLink, RouterOutlet, CommonModule],
})
export class LogUtilityComponent {
  selectedTab: string = 'tab-a';

  tabSelect(event: any) {
    if (event.target.id) {
      this.selectedTab = event.target.id;
    }
  }

  logDataA = [
    {
      timestamp: new Date(),
      status: 'off',
      message: 'Antenna DGS 1 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'normal',
      message: 'Antenna DGS 2 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'serious',
      message: 'Antenna DGS 3 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'normal',
      message: 'Antenna DGS 4 went offline.',
    },
  ];

  logDataB = [
    {
      timestamp: new Date(),
      status: 'normal',
      message: 'Antenna TCS 5 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'caution',
      message: 'Antenna TCS 6 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'critical',
      message: 'Antenna TCS 7 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'normal',
      message: 'Antenna TCS 8 went offline.',
    },
  ];
}
