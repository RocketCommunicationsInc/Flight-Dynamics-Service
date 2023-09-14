import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'fds-tabbed-child-container',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './tabbed-child-container.component.html',
  styleUrls: ['./tabbed-child-container.component.css'],
})
export class TabbedChildContainerComponent {
  @Input() tabs?: {
    label: string;
    id: string;
    selected?: boolean;
    disabled?: boolean;
  }[];
  @Input() tabsParentId!: string;
  @Input() hasTabPanels: boolean = true;

  @Input() notificationData?: any[];
  @Input() notificationHideClose?: boolean;

  onSelect(e: Event) {
    const event = e as CustomEvent;
    console.log(event.detail);
  }
}
