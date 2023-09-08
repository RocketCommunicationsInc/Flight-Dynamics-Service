import { Component, EventEmitter, ElementRef, Output } from '@angular/core';

@Component({
  selector: 'app-output-data-display',
  templateUrl: './output-data-display.html',
  styleUrls: ['./output-data-display.css'],
})
export class OutputDataDisplay {
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
