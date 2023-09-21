import { createSelector } from '@ngrx/store';
import { satellitesFeature } from './app.reducer';

export const selectSelectedSatellite = createSelector(
  satellitesFeature.selectSatellites,
  satellitesFeature.selectSelectedSatId,
  (satellites, selectedSatId) =>
    satellites.find((sat) => sat.catalogId === selectedSatId),
);
