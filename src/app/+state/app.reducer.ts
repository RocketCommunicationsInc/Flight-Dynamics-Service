import { createFeature, createReducer, on } from '@ngrx/store';
import {
  SpacecraftActions,
  ScenariosActions,
  TrackFilesActions,
  AppActions,
} from './app.actions';
import {
  AppStore,
  ScenariosState,
  SpacecraftsState,
  TrackFilesState,
} from './app.model';
import {
  scenarioAdapter,
  spacecraftAdapter,
  trackFileAdapter,
} from './app.adapters';

const initialScenarios: ScenariosState = scenarioAdapter.getInitialState({});

const initialSpacecrafts: SpacecraftsState = spacecraftAdapter.getInitialState(
  {}
);

const initialTrackFiles: TrackFilesState = trackFileAdapter.getInitialState({});

export const initialState: AppStore = {
  scenarios: initialScenarios,
  trackFiles: initialTrackFiles,
  spacecrafts: initialSpacecrafts,
  selectedSpacecraftId: null,
  selectedScenarioId: null,
  selectedTrackFileId: null,
};

export const AppReducer = createReducer(
  initialState,

  //Appwide Actions
  on(AppActions.initializeIds, (state) => {
    const selectedScenario = state.scenarios.entities[state.scenarios.ids[0]];
    const selectedSpacecraftId = selectedScenario!.spaceCraftIds[0].id;
    const selectedTrackFileId =
      state.spacecrafts.entities[selectedSpacecraftId]!.trackFileIds[0] || null;

    return {
      ...state,
      selectedTrackFileId,
      selectedScenarioId: selectedScenario?.id || null,
      selectedSpacecraftId: selectedSpacecraftId || null,
    };
  }),

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
  on(
    TrackFilesActions.trackFileModified,
    (state, { trackFileId, updatedTrackFile }) => ({
      ...state,
      trackFiles: trackFileAdapter.updateOne(
        {
          id: trackFileId,
          changes: {
            ...state.trackFiles.entities[trackFileId],
            ...updatedTrackFile,
          },
        },
        state.trackFiles
      ),
    })
  ),

  // Spacecraft actions
  on(SpacecraftActions.spacecraftsRetrieved, (state, { spacecrafts }) => {
    return {
      ...state,
      spacecrafts: spacecraftAdapter.addMany(spacecrafts, initialSpacecrafts),
    };
  }),
  on(SpacecraftActions.spacecraftIdSelected, (state, { spacecraftId }) => ({
    ...state,
    selectedSpacecraftId: spacecraftId,
  })),
  on(
    SpacecraftActions.spacecraftModified,
    (state, { spacecraftId, updatedSpacecraft }) => ({
      ...state,
      spacecrafts: spacecraftAdapter.updateOne(
        {
          id: spacecraftId,
          changes: {
            ...state.spacecrafts.entities[spacecraftId],
            ...updatedSpacecraft,
          },
        },
        state.spacecrafts
      ),
    })
  )
);

export const appFeature = createFeature({
  name: 'app',
  reducer: AppReducer,
});
