import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { TabbedChildContainerComponent } from 'src/app/shared/tabbed-child-container/tabbed-child-container.component';
import { InputsComponent } from './inputs/inputs.component';
import { OutputsComponent } from './outputs/outputs.component';

@Component({
  selector: 'fds-inputs-outputs',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    TabbedChildContainerComponent,
    InputsComponent,
    OutputsComponent,
  ],
  templateUrl: './inputs-outputs.component.html',
  styleUrls: ['./inputs-outputs.component.css'],
})
export class InputsOutputsComponent {
  tabs = [
    { label: 'Inputs', id: 'inputs-tab', selected: true },
    { label: 'Outputs', id: 'outputs-tab', selected: false },
  ];
  tabsId = 'inputs-outputs-tabs';
  notificationData = [
    {
      message: 'Update database file to initialize new orbit',
      status: 'caution',
      hideClose: false,
    },
  ];

  selected = 'inputs';

  handleSelected(e: Event): void {
    const customEvent = e as CustomEvent;
    customEvent.detail.id === 'inputs-tab'
      ? (this.selected = 'inputs')
      : (this.selected = 'outputs');
  }
}
