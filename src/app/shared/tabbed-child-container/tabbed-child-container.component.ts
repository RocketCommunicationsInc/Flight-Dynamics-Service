import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Tabs } from 'src/app/types/Tabs';

@Component({
  selector: 'fds-tabbed-child-container',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './tabbed-child-container.component.html',
  styleUrls: ['./tabbed-child-container.component.css'],
})
export class TabbedChildContainerComponent {
  @Input() tabs?: Tabs[];
  @Input() tabsParentId?: string;
  @Input() hasTabPanels: boolean = true;

  @Input() notificationData?: any[];
  @Input() notificationHideClose?: boolean;

  onSelect(e: Event) {
    const event = e as CustomEvent;
    console.log(event.detail);
  }
}
