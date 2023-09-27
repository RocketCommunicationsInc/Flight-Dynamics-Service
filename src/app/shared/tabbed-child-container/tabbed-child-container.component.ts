import { Component, Input, HostBinding } from '@angular/core';
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
  @Input() hasTabPanels: boolean = false;

  @Input() notificationData?: any[];
  @Input() notificationHideClose?: boolean;

  @Input() isUtilityContainer?: boolean = false;

  @HostBinding('class.utility-container') get isUtility() {
    return this.isUtilityContainer;
  }
}
