import { createFeature, createReducer, on } from '@ngrx/store';
import { SatelliteActions } from './app.actions';
import { AppStore } from './app.model';

export const initialState: AppStore = { satellites: [{ catalogId: 123 }] };

export const SatellitesReducer = createReducer(
  initialState,
  on(SatelliteActions.satellitesRetrieved, (state, { satellites }) => ({
    ...state,
    satellites: [...satellites],
  }))
);

export const satellitesFeature = createFeature({
  name: 'satellites',
  reducer: SatellitesReducer,
});

export const { name, reducer, selectSatellitesState, selectSatellites } =
  satellitesFeature;
