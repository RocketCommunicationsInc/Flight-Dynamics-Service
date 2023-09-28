import { createSelector } from '@ngrx/store';
import { Spacecraft, TrackFile } from '../types/data.types';
import { ScenariosState } from './app.model';
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

export const selectCurrentSpacecraftName = createSelector(
  selectAllSpacecrafts,
  selectSelectedSpacecraftId,
  (spacecrafts: Spacecraft[], spacecraftId: string | null) => {
    if (!spacecraftId) return null;
    let spacecraft;
    spacecraft = spacecrafts.find((craft) => craft.id === spacecraftId);
    return spacecraft?.catalogId;
  }
);

export const selectCurrentTrackFile = createSelector(
  selectSelectedSpacecraftId,
  selectAllScenarios,
  selectTrackFileEntities,
  selectSelectedTrackFileId,
  (spacecraftId, scenarios, trackFiles, trackFileId): TrackFile | undefined => {
    if (trackFileId) return trackFiles[trackFileId];
    /*
     * If we get down here this means a trackFile has not be selected
     * by a user yet. The default behavior is to get the first trackFile
     * on the first spacecraft on the first scenario
     */
    if (!spacecraftId) {
      throw new Error('spacecraftId is null and should be available here');
    }
    /*
     * TODO: might want to refactor to replace selectAllScenarios
     * with selectAllSpacecrafts once that selector is updated in
     * another pr
     */
    const defaultFirstSpacecraft = scenarios[0].spaceCraft.find(({ id }) => {
      return id === spacecraftId;
    });

    if (!defaultFirstSpacecraft) {
      throw new Error(
        'defaultFirstSpacecraft is undefined and should be available here'
      );
    }

    const [firstTrackfileId] = defaultFirstSpacecraft.trackFileIds;
    return trackFiles[firstTrackfileId];
  }
);
