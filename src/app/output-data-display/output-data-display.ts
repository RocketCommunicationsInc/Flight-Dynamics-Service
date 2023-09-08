import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-output-data-display',
  templateUrl: './output-data-display.html',
  styleUrls: ['./output-data-display.css'],
})
export class OutputDataDisplay {
  constructor(private toast: ElementRef) {}

  segmentedBtnData = [{ label: 'View Table' }, { label: 'View Graph' }];
  selectedBtn: string = 'View Graph';
  selectedTab: string = 'solutions-tab';


  checkChange(event: any) {
    const label = event.target.getAttribute('selected');
    if (label) {
      this.selectedBtn = label;
    }
  }

  setTab(event: any) {
    if (event.target.id) {
      this.selectedTab = event.target.id;
    }
  }

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
