import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'fds-propagator-controls',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './propagator-controls.component.html',
  styleUrls: ['./propagator-controls.component.css'],
})
export class PropagatorControlsComponent {
  @Input() showControlsPanel: boolean = false;
  @Output() onCancel = new EventEmitter();

  constructor(private toasts: ToastService) {}

  onSave() {
    this.toasts.addToast({
      message: 'Controls Saved',
      hideClose: false,
      closeAfter: 3000,
    });
  }
}
