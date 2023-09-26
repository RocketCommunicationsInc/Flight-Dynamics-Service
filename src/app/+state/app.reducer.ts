import { createFeature, createReducer, on } from '@ngrx/store';
import {
  SpacecraftActions,
  ScenariosActions,
  TrackFilesActions,
} from './app.actions';
import { AppStore, ScenariosState, TrackFilesState } from './app.model';
import { scenarioAdapter, trackFileAdapter } from './app.adapters';

const initialScenarios: ScenariosState = scenarioAdapter.getInitialState({});

const initialTrackFiles: TrackFilesState = trackFileAdapter.getInitialState({});

export const initialState: AppStore = {
  scenarios: initialScenarios,
  trackFiles: initialTrackFiles,
  spacecraftIds: [],
  selectedSpacecraftId: null,
  selectedScenarioId: null,
  selectedTrackFileId: null,
};

export const AppReducer = createReducer(
  initialState,

  //Scenario Actions
  on(ScenariosActions.scenariosRetrieved, (state, { scenarios }) => {
    return {
      ...state,
      scenarios: scenarioAdapter.addMany(scenarios, initialScenarios),
    };
  }),
  on(ScenariosActions.scenarioSelected, (state, { scenarioId }) => ({
    ...state,
    selectedScenarioId: scenarioId,
  })),

  //Track File Actions
  on(TrackFilesActions.trackFilesRetrieved, (state, { trackFiles }) => {
    return {
      ...state,
      trackFiles: trackFileAdapter.addMany(trackFiles, initialTrackFiles),
    };
  }),
  on(TrackFilesActions.addTrackFile, (state, { trackFile }) => ({
    ...state,
    trackFiles: trackFileAdapter.addOne(trackFile, state.trackFiles),
  })),
  on(TrackFilesActions.removeTrackFile, (state, { trackFileId }) => ({
    ...state,
    trackFiles: trackFileAdapter.removeOne(trackFileId, state.trackFiles),
  })),
  on(TrackFilesActions.trackFileSelected, (state, { trackFileId }) => ({
    ...state,
    selectedTrackFileId: trackFileId,
  })),

  //Spacecraft actions
  on(SpacecraftActions.getSpacecraftIds), ( state )=>{

    return { ...state, spacecraftIds}
  }
  on(SpacecraftActions.spacecraftSelected, (state, { spacecraftId }) => ({
    ...state,
    selectedSpacecraftId: spacecraftId,
  }))
);

export const appFeature = createFeature({
  name: 'app',
  reducer: AppReducer,
});

export const {
  name,
  reducer,
  selectAppState,
  selectScenarios,
  selectTrackFiles,
  selectSpacecraftIds,
  selectSelectedSpacecraftId,
  selectSelectedScenarioId,
  selectSelectedTrackFileId,
} = appFeature;
