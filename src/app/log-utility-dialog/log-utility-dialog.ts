import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-log-utility-dialog',
  templateUrl: './log-utility-dialog.html',
  styleUrls: ['./log-utility-dialog.css'],
})
export class LogUtilityDialog {
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
      message: 'Antenna DGS 1 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'serious',
      message: 'Antenna DGS 1 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'normal',
      message: 'Antenna DGS 1 went offline.',
    },
  ];

  logDataB = [
    {
      timestamp: new Date(),
      status: 'normal',
      message: 'Antenna TCS 8 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'caution',
      message: 'Antenna TCS 8 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'critical',
      message: 'Antenna TCS 8 went offline.',
    },
    {
      timestamp: new Date(),
      status: 'normal',
      message: 'Antenna TCS 8 went offline.',
    },
  ];
}
