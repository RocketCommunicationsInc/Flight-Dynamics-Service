import { createSelector } from '@ngrx/store';
import { Spacecraft, SpacecraftEntity, TrackFile } from '../types/data.types';
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

export const {
  selectAll: selectAllScenarios,
  selectEntities: selectScenarioEntities,
} = scenarioAdapter.getSelectors(selectScenarios);
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
    const spacecraftsEntity: SpacecraftEntity = spacecrafts.reduce(
      (prev, next) => ({ ...prev, [next.id]: next }),
      {}
    );
    return spacecraftsEntity;
  }
);

export const selectCurrentSpacecraft = createSelector(
  selectAllSpacecrafts,
  selectSelectedSpacecraftId,
  (spacecrafts: SpacecraftEntity, spacecraftId: string | null) => {
    if (!spacecraftId) return null;
    return spacecrafts[spacecraftId];
  }
);

export const selectCurrentTrackFile = createSelector(
  selectTrackFileEntities,
  selectSelectedTrackFileId,
  (trackFiles, trackFileId): TrackFile | null => {
    const currentTrackFile =
      trackFileId && trackFiles ? trackFiles[trackFileId]! : null;
    return currentTrackFile;
  }
);

export const selectCurrentSpaceCraftTrackFiles = createSelector(
  selectTrackFileEntities,
  selectCurrentSpacecraft,
  (trackfiles, spacecraft) => {
    if (!spacecraft) return;

    const spacecraftTrackfileIds: string[] = spacecraft.trackFileIds;
    let spacecraftAllTrackFiles: TrackFile[] = [];
    if (spacecraftTrackfileIds) {
      for (const id of spacecraftTrackfileIds) {
        spacecraftAllTrackFiles.push(trackfiles[id]!);
      }
    }
    return spacecraftAllTrackFiles;
  }
);

export const selectCurrentTrackFileEphemerisData = createSelector(
  selectCurrentTrackFile,
  (TrackFile): { [key: string]: number } | null => {
    return TrackFile!.ephemerisSourceFile.satCords;
  }
);
