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
  logData = [
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
}
