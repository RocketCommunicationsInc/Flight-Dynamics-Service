import { createFeature, createReducer, on } from '@ngrx/store';
import { SatelliteActions, ScenariosActions, TrackFilesActions } from './app.actions';
import { AppStore } from './app.model';

export const initialState: AppStore = {
  scenarios: [],
  trackFiles: [],
  satellites: [],
  selectedSatId: null,
};

export const AppReducer = createReducer(
  initialState,
  on(ScenariosActions.scenariosRetrieved, (state, { scenarios }) => ({
    ...state,
    scenarios: [...scenarios],
  })),
  on(TrackFilesActions.trackFilesRetrieved, (state, { trackFiles }) => ({
    ...state,
    trackFiles: [...trackFiles],
  })),
  on(SatelliteActions.satelliteSelected, (state, { satId }) => ({
    ...state,
    selectedSatId: satId,
  })),
);

export const appFeature = createFeature({
  name: 'app',
  reducer: AppReducer,
});

export const {
  name,
  reducer,
  selectAppState,
  selectSatellites,
  selectSelectedSatId,
} = appFeature;
