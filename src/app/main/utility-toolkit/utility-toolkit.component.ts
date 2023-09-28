import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { selectCurrentSpacecraft } from 'src/app/+state/app.selectors';
import { Spacecraft } from 'src/app/types/data.types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  spacecraft$: Observable<Spacecraft | null | undefined>;
  spacecraft: Spacecraft | null | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.spacecraft$ = this.store.select(selectCurrentSpacecraft);
  }

  ngOnInit() {
    this.spacecraft$.subscribe((res: Spacecraft | null | undefined) => {
      this.spacecraft = res;
    });
  }

  onClick(util: Utility) {
    this.router.navigate([`./${util.link}`], {
      relativeTo: this.route.firstChild,
    });
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
