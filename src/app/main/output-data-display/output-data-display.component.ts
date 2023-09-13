import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

import { ChildContainerComponent } from 'src/app/shared';

@Component({
  selector: 'fds-output-data-display',
  standalone: true,
  imports: [CommonModule, ChildContainerComponent, AstroComponentsModule],
  templateUrl: './output-data-display.component.html',
  styleUrls: ['./output-data-display.component.css'],
})
export class OutputDataDisplayComponent {
  tabs = [
    { label: 'OD Solution', selected: true },
    { label: 'OD Performance', disabled: true },
  ];

  notifications = [
    {
      message: 'Happened before the notification at index 1',
      status: 'critical',
      timestamp: new Date().getTime() - 10_000,
    },
    {
      message: 'OD succesfully completed on ',
      status: 'normal',
      timestamp: new Date().getTime(),
    },
  ];

  constructor() {
    this.notifications.sort((a, b) => b.timestamp - a.timestamp);
  }

  onSelect(e: Event) {
    const event = e as CustomEvent;
    console.log(event.detail);
  }
}
