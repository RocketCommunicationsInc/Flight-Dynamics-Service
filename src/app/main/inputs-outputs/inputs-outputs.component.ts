import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Tabs } from 'src/app/types/Tabs';
import { InputsComponent } from './inputs/inputs.component';
import { OutputsComponent } from './outputs/outputs.component';

@Component({
  selector: 'fds-inputs-outputs',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    InputsComponent,
    OutputsComponent,
  ],
  templateUrl: './inputs-outputs.component.html',
  styleUrls: ['./inputs-outputs.component.css'],
})
export class InputsOutputsComponent {
  tabsId = 'inputs-outputs-tabs';
  tabs: Tabs[] = [
    { label: 'Inputs', id: 'inputs-tab', selected: true },
    { label: 'Outputs', id: 'outputs-tab', selected: false },
  ];
}
