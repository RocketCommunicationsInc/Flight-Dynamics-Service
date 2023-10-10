import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ToastService } from 'src/app/shared/toast.service';
@Component({
  selector: 'fds-sites',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent {
  @Input() isSitesDrawerOpen: boolean = false;

  constructor(private toast: ToastService) {}

  onCheck() {
    this.toast.defaultToast();
  }
}
