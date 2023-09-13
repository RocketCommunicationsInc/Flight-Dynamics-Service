import { Component } from '@angular/core';
import { AstroComponentsModule, RuxToastStack } from '@astrouxds/angular';

@Component({
  standalone: true,
  selector: 'fds-global-status-bar',
  templateUrl: './global-status-bar.component.html',
  styleUrls: ['./global-status-bar.component.css'],
  imports: [AstroComponentsModule],
})
export class GlobalStatusBarComponent {
  lightMode: Boolean;

  handleSelection(e: Event) {
    const event = e as CustomEvent;
    if (event.detail.value === 'mode') {
      const body = document.body;
      body?.classList.toggle('light-theme');
      this.lightMode = !this.lightMode;
    }
    if (event.detail.value === 'unavailable') {
      this.showToast();
    }
  }
  /**
   * Show the 'feature not implemented' toast.
   */
  showToast() {
    /* Scenario Library is currently housing RuxToastStack */
    const toastStack = document.querySelector('rux-toast-stack');
    toastStack?.addToast({
      message: 'This feature has not been implemented.',
      hideClose: false,
      closeAfter: 3000,
    });
  }

  constructor() {
    this.lightMode = false;
    this.showToast();
  }
}
