import { Component, Output, EventEmitter, ElementRef } from '@angular/core';

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

  constructor(private toast: ElementRef) {}

  @Output() ruxmenuselected: EventEmitter<any> = new EventEmitter<any>();

  showToast() {
    const toastStack =
      this.toast.nativeElement.querySelector('rux-toast-stack');

    toastStack.addToast({
      message: 'This feature has not been implemented.',
      hideClose: false,
      closeAfter: 3000,
    });
  }

  menuSelect() {
    this.showToast();
  }
}
