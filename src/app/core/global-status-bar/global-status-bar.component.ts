import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
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

  //Show the default 'feature not implemented' toast.
  showToast() {
    this.toasts.defaultToast();
  }

  constructor(private toasts: ToastService) {
    this.lightMode = false;
    this.showToast();
  }
}
