import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UnitSelectorComponent } from '../../shared';
import { UnitMenuItems, selectUnit } from '../../shared/units/units.model';
import { selectCurrentSpacecraft } from 'src/app/+state/app.selectors';
import { Spacecraft } from 'src/app/types/data.types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'fds-scenario-data-display',
  templateUrl: './scenario-data-display.component.html',
  styleUrls: ['./scenario-data-display.component.css'],
  imports: [
    AstroComponentsModule,
    UnitSelectorComponent,
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
})
export class ScenarioDataDisplayComponent {
  catalogId = 30184;
  semiMajorAxis = 63714327;
  perigee = 363396432;
  inclination = 23.4362;
  eccentricity = 92.39401;
  mass = 43.23404;
  spacecraft$: Observable<Spacecraft|null|undefined>;

  distanceUnits = [
    UnitMenuItems.meters,
    selectUnit(UnitMenuItems.kilometers),
    UnitMenuItems.miles,
  ];
  arcUnits = [
    selectUnit(UnitMenuItems.degrees),
    UnitMenuItems.radians,
    UnitMenuItems.revolutions,
  ];

  constructor(private store:Store){
    this.spacecraft$ = this.store.select(selectCurrentSpacecraft);
  }
}
