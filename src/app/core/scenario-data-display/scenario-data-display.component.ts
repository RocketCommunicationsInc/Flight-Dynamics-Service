import { Component, DestroyRef, inject } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { UnitSelectorComponent } from '../../shared';
import { UnitMenuItems, selectUnit } from '../../shared/units/units.model';
import {
  OrbitProperties,
  Spacecraft,
  TrackFile,
} from 'src/app/types/data.types';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  selectCurrentSpacecraft,
  selectCurrentTrackFile,
} from 'src/app/+state/app.selectors';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'fds-scenario-data-display',
  templateUrl: './scenario-data-display.component.html',
  styleUrls: ['./scenario-data-display.component.css'],
  imports: [AstroComponentsModule, UnitSelectorComponent, CommonModule],
})
export class ScenarioDataDisplayComponent {
  destroyRef = inject(DestroyRef);
  spacecraft$: Observable<Spacecraft | null | undefined>;
  trackfile$: Observable<TrackFile | null>;
  initialOrbit: OrbitProperties | null = null;
  semiMajorAxis: number = 0;
  perigee: number = 0;
  inclination: number = 0;

  //subscriptions
  trackFileSub: Subscription | undefined;

  constructor(private store: Store) {
    this.spacecraft$ = this.store.select(selectCurrentSpacecraft);
    this.trackfile$ = this.store.select(selectCurrentTrackFile);
    this.trackFileSub = this.trackfile$.pipe(takeUntilDestroyed()).subscribe((res)=>{
      const initialOrbit = res?.initialOrbitProperties || null
      this.initialOrbit = initialOrbit
      this.semiMajorAxis= initialOrbit?.semiMajorAxis.value || 0;
      this.perigee = initialOrbit?.perigee.value || 0;
      this.inclination = initialOrbit?.inclination.value || 0;
    });
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
