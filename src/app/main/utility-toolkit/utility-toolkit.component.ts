import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { selectCurrentSpacecraft } from 'src/app/+state/app.selectors';
import { ToastService } from 'src/app/shared/toast.service';

interface Utility {
  icon: string;
  label: string;
  link: string;
}

@Component({
  selector: 'fds-utility-toolkit',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, RouterModule],
  templateUrl: './utility-toolkit.component.html',
  styleUrls: ['./utility-toolkit.component.css'],
})
export class UtilityToolkitComponent {
  @Input({ required: true }) currentToolkitPath: undefined | string;
  spacecraft$ = this.store.select(selectCurrentSpacecraft);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private toast: ToastService
  ) {}

  utilities: Utility[] = [
    {
      icon: 'list',
      label: 'Log',
      link: 'log',
    },
    {
      icon: 'antenna-receive',
      label: 'Track Data',
      link: 'track',
    },
    {
      icon: 'public',
      label: 'Propagator',
      link: 'propagator',
    },
  ];

  onClick(util: Utility) {
    this.router.navigate([`./${util.link}`], {
      relativeTo: this.route.firstChild,
    });
  }

  createReport() {
    this.toast.addToast({
      message: 'Report Created',
      hideClose: false,
      closeAfter: 3000,
    });
  }
}
