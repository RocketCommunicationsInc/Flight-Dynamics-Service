import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { UnitSelectorComponent } from '../../shared';
import { CommonModule } from '@angular/common';
import { UnitMenuItems, selectUnit } from '../../shared/units/units.model';
import { Spacecraft } from 'src/app/types/data.types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentSpacecraft } from 'src/app/+state/app.selectors';

@Component({
  standalone: true,
  selector: 'fds-scenario-data-display',
  templateUrl: './scenario-data-display.component.html',
  styleUrls: ['./scenario-data-display.component.css'],
  imports: [AstroComponentsModule, UnitSelectorComponent, CommonModule],
})
export class ScenarioDataDisplayComponent {
  spacecraft$: Observable<Spacecraft | null | undefined>;
  catalogId = 30184;
  semiMajorAxis = 63714327;
  perigee = 363396432;
  inclination = 23.4362;
  eccentricity = 92.39401;
  mass = 43.23404;


  constructor(private store: Store) {
    this.spacecraft$ = this.store.select(selectCurrentSpacecraft);
  }

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

}
