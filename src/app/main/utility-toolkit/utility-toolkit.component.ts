import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

interface Utility {
  icon: string;
  label: string;
  link: string;
}

@Component({
  selector: 'fds-utility-toolkit',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './utility-toolkit.component.html',
  styleUrls: ['./utility-toolkit.component.css'],
})
export class UtilityToolkitComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  id = '000';

  onClick(util: Utility) {
    this.router.navigate([`./${util.link}`], {relativeTo: this.route.firstChild});
  }

  utilities: Utility[] = [
    {
      icon: 'tune',
      label: 'Compare',
      link: 'compare',
    },
    {
      icon: 'add-circle',
      label: 'Create Report',
      link: 'report',
    },
    {
      icon: 'list',
      label: 'Log',
      link: 'log',
    },
    {
      icon: 'antenna',
      label: 'Track Data',
      link: 'track',
    },
    {
      icon: 'public',
      label: 'Propagator',
      link: 'propagator',
    },
  ];
}
