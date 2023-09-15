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
      onClick: (e) => console.log('do the Create Report thingy', e),
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
      onClick: (e) => console.log('do the Track Data thingy', e),
    },
    {
      icon: 'tune',
      label: 'Propagator',
      onClick: (e) => console.log('do the Propagator thingy', e),
    },
  ];
}
