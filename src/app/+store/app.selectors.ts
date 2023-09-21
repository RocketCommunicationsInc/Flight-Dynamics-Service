import { createSelector } from '@ngrx/store';
import { appFeature } from './app.reducer';

export const selectSelectedSatellite = createSelector(
  appFeature.selectSatellites,
  appFeature.selectSelectedSatId,
  (satellites, selectedSatId) =>
    satellites.find((sat) => sat.catalogId === selectedSatId),
);
