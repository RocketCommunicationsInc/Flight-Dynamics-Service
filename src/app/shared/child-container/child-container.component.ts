import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

import { Tabs } from 'src/app/types/Tabs';

@Component({
  selector: 'fds-child-container',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './child-container.component.html',
  styleUrls: ['./child-container.component.css'],
})
export class ChildContainerComponent {
  @Input({ required: true }) tabs: Tabs[] = [];
  @Output() onTabSelect = new EventEmitter<string>();

  onSelect(e: Event) {
    const event = e as CustomEvent;
    this.onTabSelect.emit(event.detail.id);
  }
}
