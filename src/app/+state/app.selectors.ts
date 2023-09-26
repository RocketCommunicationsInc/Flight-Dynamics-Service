import { createSelector } from '@ngrx/store';
import { AppStore, ScenariosState } from './app.model';
import { appFeature } from './app.reducer';

export const scenariosSelector = createSelector(
  (state: AppStore) => state.scenarios,
  (scenarios: ScenariosState) => scenarios
);
