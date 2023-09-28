import { createSelector } from '@ngrx/store';
import { Spacecraft, TrackFile } from '../types/data.types';
import { ScenariosState, TrackFilesState } from './app.model';
import { scenarioAdapter, trackFileAdapter } from './app.adapters';
import { appFeature } from './app.reducer';

export const {
  name,
  reducer,
  selectAppState,
  selectScenarios,
  selectTrackFiles,
  selectSelectedSpacecraftId,
  selectSelectedScenarioId,
  selectSelectedTrackFileId,
} = appFeature;

export const { selectAll: selectAllScenarios } =
  scenarioAdapter.getSelectors(selectScenarios);
export const {
  selectAll: selectAllTrackFiles,
  selectEntities: selectTrackFileEntities,
} = trackFileAdapter.getSelectors(selectTrackFiles);

export const selectAllSpacecrafts = createSelector(
  selectScenarios,
  (state: ScenariosState) => {
    let spacecrafts: Spacecraft[] = [];
    state.ids.map((id) => {
      state.entities[id]?.spaceCraft.map((craft) => spacecrafts.push(craft));
    });
    return spacecrafts;
  }
);

export const selectCurrentSpacecraft = createSelector(
  selectAllSpacecrafts,
  selectSelectedSpacecraftId,
  (spacecrafts: Spacecraft[], spacecraftId: string | null) => {
    if (!spacecraftId) return null;
    return spacecrafts.find((craft) => craft.id === spacecraftId);
  }
);

export const selectCurrentTrackFile = createSelector(
  selectTrackFileEntities,
  selectSelectedTrackFileId,
  (trackFiles: any, trackFileId: string | null) => {
    if (!trackFileId) return null;
    return trackFiles[trackFileId];
  }
);
