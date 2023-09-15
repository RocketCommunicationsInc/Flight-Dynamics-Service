import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Router } from '@angular/router';

interface Utility {
  icon: string;
  label: string;
  onClick: (e: Event) => void;
}

@Component({
  selector: 'fds-utility-toolkit',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './utility-toolkit.component.html',
  styleUrls: ['./utility-toolkit.component.css'],
})
export class UtilityToolkitComponent {
  constructor(private router: Router) {}
  id = '000';

  utilities: Utility[] = [
    {
      icon: 'tune',
      label: 'Compare',
      onClick: () =>
        this.router.navigateByUrl('/').then(() => {
          this.router.navigate([{ outlets: { compare: ['compare-util'] } }]);
        }),
    },
    {
      icon: 'tune',
      label: 'Create Report',
      onClick: () =>
        this.router.navigateByUrl('/').then(() => {
          this.router.navigate([{ outlets: { report: ['report-util'] } }]);
        }),
    },
    {
      icon: 'tune',
      label: 'Log',
      onClick: () =>
        this.router.navigateByUrl('/').then(() => {
          this.router.navigate([{ outlets: { log: ['log-util'] } }]);
        }),
    },
    {
      icon: 'tune',
      label: 'Track Data',
      onClick: () =>
        this.router.navigateByUrl('/').then(() => {
          this.router.navigate([{ outlets: { track: ['track-util'] } }]);
        }),
    },
    {
      icon: 'tune',
      label: 'Propagator',
      onClick: () =>
        this.router.navigateByUrl('/').then(() => {
          this.router.navigate([
            { outlets: { propagator: ['propagator-util'] } },
          ]);
        }),
    },
  ];
}
