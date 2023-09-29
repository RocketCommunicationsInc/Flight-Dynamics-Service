import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { TabbedChildContainerComponent } from 'src/app/shared/tabbed-child-container/tabbed-child-container.component';
import { InputsComponent } from './inputs/inputs.component';
import { OutputsComponent } from './outputs/outputs.component';
import { Tabs } from 'src/app/types/Tabs';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/+state/app.model';
import { Observable, Subscription } from 'rxjs';
import { Spacecraft } from 'src/app/types/data.types';
import { selectCurrentSpacecraft } from 'src/app/+state/app.selectors';

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
  tabs: Tabs[] = [
    { label: 'Inputs', id: 'inputs-tab', selected: true },
    { label: 'Outputs', id: 'outputs-tab', selected: false },
  ];
  tabsId: string = 'inputs-outputs-tabs';

  selected = 'inputs';

  handleSelected(e: Event): void {
    const customEvent = e as CustomEvent;
    customEvent.detail.id === 'inputs-tab'
      ? (this.selected = 'inputs')
      : (this.selected = 'outputs');
  }
}
