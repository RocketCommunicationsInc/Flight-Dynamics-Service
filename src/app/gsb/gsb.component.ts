import { Component, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gsb',
  templateUrl: './gsb.component.html',
  styleUrls: ['./gsb.component.css'],
})
export class GsbComponent {
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

  selectedTab: string = 'orbit';

  tabSelect(event: any) {
    if (event.target.id !== this.selectedTab) {
      this.showToast();
    }
  }
}
