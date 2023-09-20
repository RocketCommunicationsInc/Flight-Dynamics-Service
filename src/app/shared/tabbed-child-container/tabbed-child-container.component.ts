import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { InputsComponent } from 'src/app/main/inputs-outputs/inputs/inputs.component';
import { OutputsComponent } from 'src/app/main/inputs-outputs/outputs/outputs.component';
import { Tabs } from 'src/app/types/Tabs';

@Component({
  selector: 'fds-tabbed-child-container',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    InputsComponent,
    OutputsComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './tabbed-child-container.component.html',
  styleUrls: ['./tabbed-child-container.component.css'],
})
export class TabbedChildContainerComponent {
  @Input() tabs?: Tabs[];
  @Input() tabsParentId?: string;
  @Input() hasTabPanels: boolean = false;

  @Input() notificationData?: any[];
  @Input() notificationHideClose?: boolean;

  @ContentChildren('tabContent')
  tabContents!: QueryList<any>;

  ngAfterContentInit(): void {
    console.log(this.tabContents);
    //this.tabContents!.forEach((tabInstance) => console.log(tabInstance));
  }

  onSelect(e: Event) {
    const event = e as CustomEvent;
    console.log(event.detail);
  }
}
