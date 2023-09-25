import { createFeature, createReducer, on } from '@ngrx/store'
import {
  SpacecraftActions,
  ScenariosActions,
  TrackFilesActions,
} from './app.actions'
import { AppStore, ScenariosState, TrackFilesState, SpacecraftState } from './app.model'
import { scenarioAdapter, trackFileAdapter, spacecraftAdapter } from './app.adapters'

const initialScenarios: ScenariosState = scenarioAdapter.getInitialState({
  selectedScenarioId: ''
})

const initialTrackFiles: TrackFilesState = trackFileAdapter.getInitialState({
  selectedTrackFileId: ''
})

const initialSpacecrafts: SpacecraftState = spacecraftAdapter.getInitialState({
  selectedSpacecraftId: ''
})

export const initialState: AppStore = {
  scenarios: initialScenarios,
  trackFiles: initialTrackFiles,
  spacecrafts: initialSpacecrafts,
  selectedSpacecraftId: null,
}

export const AppReducer = createReducer(
  initialState,
  on(ScenariosActions.scenariosRetrieved, (state, { scenarios }) => {
    return ({
    ...state,
    scenarios: scenarioAdapter.addMany(scenarios, initialScenarios),
  })}),
  on(TrackFilesActions.trackFilesRetrieved, (state, { trackFiles }) => {
    return ({
    ...state,
    trackFiles: trackFileAdapter.addMany(trackFiles, initialTrackFiles),
  })}),
  on(TrackFilesActions.addTrackFile, (state, { trackFile }) =>  ({
    ...state,
    trackFiles: trackFileAdapter.addOne(trackFile, state.trackFiles),
  })),
  on(TrackFilesActions.removeTrackFile, (state, { trackFileId }) =>  ({
    ...state,
    trackFiles: trackFileAdapter.removeOne(trackFileId, state.trackFiles),
  })),
  on(SpacecraftActions.spacecraftsRetrieved, (state, { spacecrafts }) => {
    return ({
    ...state,
    spacecrafts: spacecraftAdapter.addMany(spacecrafts, initialSpacecrafts),
  })}),
  on(SpacecraftActions.spacecraftSelected, (state, { spacecraftId }) => ({
    ...state,
    selectedSatId: spacecraftId,
  }))
)

export const appFeature = createFeature({
  name: 'app',
  reducer: AppReducer,
})

export const {
  name,
  reducer,
  selectAppState,
  selectScenarios,
  selectTrackFiles,
  selectSpacecrafts,
  selectSelectedSpacecraftId,
} = appFeature
