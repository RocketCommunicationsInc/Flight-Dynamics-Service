import { createSelector } from '@ngrx/store';
import { satellitesFeature } from './app.reducer';

export const selectBookListPageViewModel = createSelector(
  satellitesFeature.selectSatellites,
  satellitesFeature.selectSatellites,
  (satellites) => ({ satellites })
);
