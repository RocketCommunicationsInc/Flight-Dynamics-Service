import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-global-status-bar',
  templateUrl: './global-status-bar.html',
  styleUrls: ['./global-status-bar.css'],
})
export class GlobalStatusBar {
  constructor(private toast: ElementRef) {}

  selectedTab: string = 'orbit';

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

  tabSelect(event: any) {
    if (event.target.id !== this.selectedTab) {
      this.showToast();
    }
  }
}
