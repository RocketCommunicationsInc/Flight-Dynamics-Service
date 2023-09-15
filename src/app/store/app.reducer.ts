import { createFeature, createReducer, on } from '@ngrx/store';
import { SatelliteActions } from './app.actions';
import { AppStore } from './app.model';

export const initialState: AppStore = {
  satellites: [{ catalogId: 123 }],
  selectedSatId: null,
};

export const SatellitesReducer = createReducer(
  initialState,
  on(SatelliteActions.satellitesRetrieved, (state, { satellites }) => ({
    ...state,
    satellites: [...satellites],
  })),
  on(SatelliteActions.satelliteSelected, (state, { satId }) => ({
    ...state,
    selectedSatId: satId,
  }))
);

export const satellitesFeature = createFeature({
  name: 'satellites',
  reducer: SatellitesReducer,
});

export const { name, reducer, selectSatellitesState, selectSatellites, selectSelectedSatId } =
  satellitesFeature;
