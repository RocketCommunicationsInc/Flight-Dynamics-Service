import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'fds-log-utility-dialog',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './log-utility-dialog.component.html',
  styleUrls: ['./log-utility-dialog.component.css'],
})
export class LogUtilityDialogComponent {
  @Input() openDialog = false;

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
