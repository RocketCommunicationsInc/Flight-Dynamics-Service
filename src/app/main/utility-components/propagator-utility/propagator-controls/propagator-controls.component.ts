import { Component, Input } from '@angular/core';
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

  constructor(private toasts: ToastService) {}

  onSave() {
    this.toasts.addToast({
      message: 'Controls saved',
      hideClose: false,
      closeAfter: 3000,
    });
  }

  //TODO figure out how to make the btn flip 
  onCancel() {
    this.showControlsPanel = false
  }
}
