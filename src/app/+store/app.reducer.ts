import { createFeature, createReducer, on } from '@ngrx/store'
import {
  SpacecraftActions,
  ScenariosActions,
  TrackFilesActions,
} from './app.actions'
import { AppStore } from './app.model'

export const initialState: AppStore = {
  scenarios: [],
  trackFiles: [],
  spacecrafts: [],
  selectedSpacecraftId: null,
}

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
  on(SpacecraftActions.spacecraftsRetrieved, (state, { spacecrafts }) => ({
    ...state,
    spacecrafts: [...spacecrafts],
  })),
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
