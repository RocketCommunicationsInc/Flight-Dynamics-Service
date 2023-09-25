import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { AstroComponentsModule, RuxToastStack } from '@astrouxds/angular';
import { ToastService } from '../../shared/toast.service';

@Component({
  standalone: true,
  selector: 'fds-global-status-bar',
  templateUrl: './global-status-bar.component.html',
  styleUrls: ['./global-status-bar.component.css'],
  imports: [AstroComponentsModule],
})
export class GlobalStatusBarComponent {
  @Output() onChangeTheme = new EventEmitter();
  @Input() lightMode = false;

  handleSelection(e: Event) {
    const menuActions = {
      mode: () => this.onChangeTheme.emit(),
      unavailable: () => this.showToast(),
    };
    const key: 'mode' | 'unavailable' = (e as CustomEvent).detail.value;
    menuActions[key]();
  }
  /**
   * Show the 'feature not implemented' toast.
   */
  showToast() {
    this.toasts.addToast({
      message: 'This feature has not been implemented.',
      hideClose: false,
      closeAfter: 3000,
    });
  }

  constructor(private toasts: ToastService) {
    this.lightMode = false;
    this.showToast();
  }
}
