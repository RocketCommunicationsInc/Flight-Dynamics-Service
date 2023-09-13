import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule, RuxTab } from '@astrouxds/angular';

import { ChildContainerComponent } from 'src/app/shared';

interface Tab {
  label: string;
  disabled?: RuxTab['disabled'];
  selected?: RuxTab['selected'];
}

@Component({
  selector: 'fds-output-data-display',
  standalone: true,
  imports: [CommonModule, ChildContainerComponent, AstroComponentsModule],
  templateUrl: './output-data-display.component.html',
  styleUrls: ['./output-data-display.component.css'],
})
export class OutputDataDisplayComponent {
  tabs: Tab[] = [
    { label: 'OD Solution', selected: true },
    { label: 'OD Performance', disabled: true },
  ];

  onSelect(e: Event) {
    console.log(e);
  }
}
