import { createFeature, createReducer, on } from '@ngrx/store';
import {
  SpacecraftActions,
  ScenariosActions,
  TrackFilesActions,
  AppActions,
} from './app.actions';
import { AppStore, ScenariosState, TrackFilesState } from './app.model';
import { scenarioAdapter, trackFileAdapter } from './app.adapters';
import { findIndex } from 'rxjs';
import { state } from '@angular/animations';
import { Spacecraft } from '../types/data.types';

const initialScenarios: ScenariosState = scenarioAdapter.getInitialState({});

const initialTrackFiles: TrackFilesState = trackFileAdapter.getInitialState({});

export const initialState: AppStore = {
  scenarios: initialScenarios,
  trackFiles: initialTrackFiles,
  selectedSpacecraftId: null,
  selectedScenarioId: null,
  selectedTrackFileId: null,
};

export const AppReducer = createReducer(
  initialState,

  //Appwide Actions
  on(AppActions.initializeIds, (state) => {
    const selectedScenario = state.scenarios.entities[state.scenarios.ids[0]];
    const selectedSpacecraft = selectedScenario?.spaceCraft[0];
    const selectedTrackFileId = selectedSpacecraft?.trackFileIds[0] || null;

    return {
      ...state,
      selectedTrackFileId,
      selectedScenarioId: selectedScenario?.id || null,
      selectedSpacecraftId: selectedSpacecraft?.id || null,
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
  on(
    TrackFilesActions.trackFileProcessed,
    (state, { trackFileId, processedTrackFile }) => ({
      ...state,
      trackFiles: trackFileAdapter.updateOne(
        {
          id: trackFileId,
          changes: {
            ...state.trackFiles.entities[trackFileId],
            processedTrackFile: processedTrackFile,
          },
        },
        state.trackFiles
      ),
    })
  ),

  // Spacecraft actions
  on(SpacecraftActions.spacecraftIdSelected, (state, { spacecraftId }) => ({
    ...state,
    selectedSpacecraftId: spacecraftId,
  })),
  on(
    SpacecraftActions.spacecraftEventAdded,
    (state, { scenarioId, spacecraftId, event }) => {
      const scenario = state.scenarios.entities[scenarioId];
      const updatedSpacecrafts: any = scenario?.spaceCraft.map((craft) => {
        if (craft.id === spacecraftId) {
          let updatedEvents = [...craft.eventData, ...[event]];
          const changes = { eventData: updatedEvents };
          return {
            ...craft,
            ...changes,
          };
        }
        return craft;
      });
      return {
        ...state,
        scenarios: scenarioAdapter.updateOne(
          {
            id: scenarioId,
            changes: {
              ...scenario,
              spaceCraft: updatedSpacecrafts,
            },
          },
          state.scenarios
        ),
      };
    }
  )
);

export const appFeature = createFeature({
  name: 'app',
  reducer: AppReducer,
});
