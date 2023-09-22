import { createSelector } from '@ngrx/store';
import { satellitesFeature } from './app.reducer';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

export const selectSelectedSatellite = createSelector(
  satellitesFeature.selectSatellites,
  (satellites) => {
    const route = inject(ActivatedRouteSnapshot);
    const selectedSatId = route.params['id'];
    return satellites.find((sat) => sat.catalogId === selectedSatId);
  }
);
