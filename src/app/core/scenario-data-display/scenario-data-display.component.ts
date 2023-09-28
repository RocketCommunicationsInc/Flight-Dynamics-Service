import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UnitSelectorComponent } from '../../shared';
import { UnitMenuItems, selectUnit } from '../../shared/units/units.model';
import { selectCurrentSpacecraft, selectCurrentTrackFile, selectSelectedTrackFileId } from 'src/app/+state/app.selectors';
import { Spacecraft, TrackFile } from 'src/app/types/data.types';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { trackFileAdapter } from 'src/app/+state/app.adapters';
import { TrackFilesActions } from 'src/app/+state/app.actions';

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
  trackfile$: Observable<TrackFile|null>;
  trackFileId$: Observable<string|null>;
  spacecraft: Spacecraft|null|undefined = null

  //subscriptions
  trackFileIdSubscription: Subscription|null = null
  spacecraftSubscription: Subscription|null = null

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
    this.trackfile$ = this.store.select(selectCurrentTrackFile);
    this.trackFileId$ = this.store.select(selectSelectedTrackFileId);
  }

  //! I added this to grab an initial trackfile we should remove it if this is done somewhere else
  ngOnInit(){
    this.trackFileIdSubscription = this.trackFileId$.subscribe((res)=>{
      if(res !==null || !this.spacecraft) return;

      this.store.dispatch(TrackFilesActions.trackFileSelected({trackFileId: this.spacecraft.trackFileIds[0]}))
    })
    this.spacecraftSubscription = this.spacecraft$.subscribe((res)=>{
      this.spacecraft = res
    })
  }

  ngOnDestroy(){
    this.trackFileIdSubscription?.unsubscribe()
    this.spacecraftSubscription?.unsubscribe()
  }

}
