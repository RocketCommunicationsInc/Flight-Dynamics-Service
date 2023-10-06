import { createSelector } from '@ngrx/store';
import { Spacecraft, SpacecraftEntity, TrackFile } from '../types/data.types';
import { ScenariosState } from './app.model';
import {
  scenarioAdapter,
  spacecraftAdapter,
  trackFileAdapter,
} from './app.adapters';
import { appFeature } from './app.reducer';

export const {
  name,
  reducer,
  selectAppState,
  selectScenarios,
  selectSpacecrafts,
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
export const {
  selectAll: selectAllSpacecrafts,
  selectEntities: selectSpacecraftEntities,
} = spacecraftAdapter.getSelectors(selectSpacecrafts);

export const selectCurrentSpacecraft = createSelector(
  selectSpacecraftEntities,
  selectSelectedSpacecraftId,
  (spacecrafts, spacecraftId: string | null) => {
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
