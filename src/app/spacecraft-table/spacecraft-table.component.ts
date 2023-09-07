import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spacecraft-table',
  templateUrl: './spacecraft-table.component.html',
  styleUrls: ['./spacecraft-table.component.css'],
})
export class SpacecraftTableComponent {
  @Output() onRuxchange: EventEmitter<any> = new EventEmitter();

  segmentedBtnData = [{ label: 'View Table' }, { label: 'View Graph' }];

  selectedBtn: string = 'View Graph';

  checkChange(event: any) {
    const label = event.target.getAttribute('selected');
    if (label) {
      this.selectedBtn = label;
    }
  }

  selectedTab: string = 'solutions-tab';

  setTab(event: any) {
    if (event.target.id) {
      this.selectedTab = event.target.id;
    }
  }
}
