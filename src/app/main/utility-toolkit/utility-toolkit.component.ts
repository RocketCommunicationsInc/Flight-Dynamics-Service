import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { selectSelectedSpacecraftId } from 'src/app/+state/app.reducer';
import { selectAllSpacecrafts } from 'src/app/+state/app.selectors';
import { Spacecraft } from 'src/app/types/data.types';
import { select, Store } from '@ngrx/store';
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
  selectedSpacecraftId$: Observable<string | null>;
  spacecrafts$: Observable<Spacecraft[] | null>;
  spacecrafts: Spacecraft[] | null | undefined;
  selectedSpacecraft: Spacecraft | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.selectedSpacecraftId$ = this.store.pipe(
      select(selectSelectedSpacecraftId)
    );
    this.spacecrafts$ = this.store.pipe(select(selectAllSpacecrafts));
  }

  ngOnInit() {
    this.spacecrafts$.subscribe((result) => (this.spacecrafts = result));

    this.selectedSpacecraftId$.subscribe(
      (result) =>
        (this.selectedSpacecraft = this.spacecrafts?.filter(
          (craft) => craft.id === result
        )[0])
    );
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
