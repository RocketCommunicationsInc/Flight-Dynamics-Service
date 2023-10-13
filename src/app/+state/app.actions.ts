import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type {
  ProcessedTrackFile,
  Scenario,
  Spacecraft,
  TrackFile,
} from '../types/data.types';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Initialize Ids': emptyProps(),
  },
});

export const SpacecraftActions = createActionGroup({
  source: 'Spacecraft',
  events: {
    'Spacecrafts Requested': emptyProps(),
    'Spacecrafts Retrieved': props<{ spacecrafts: Spacecraft[] }>(),
    'Spacecraft Id Selected': props<{ spacecraftId: string }>(),
    'Spacecraft Modified': props<{
      spacecraftId: string;
      updatedSpacecraft: Spacecraft;
    }>(),
  },
});

export const ScenariosActions = createActionGroup({
  source: 'Scenarios',
  events: {
    'Scenarios Requested': emptyProps(),
    'Scenarios Retrieved': props<{ scenarios: Scenario[] }>(),
    'Scenario Selected': props<{ scenarioId: string }>(),
  },
});

export const TrackFilesActions = createActionGroup({
  source: 'Track Files',
  events: {
    'Track Files Requested': emptyProps(),
    'Track Files Retrieved': props<{ trackFiles: TrackFile[] }>(),
    'Track File Selected': props<{ trackFileId: string }>(),
    'Track File Modified': props<{
      trackFileId: string;
      updatedTrackFile: TrackFile;
    }>(),
    'Track File Processed': props<{
      processedTrackFile: ProcessedTrackFile;
      trackFileId: string;
    }>(),
    'Add Track File': props<{ trackFile: TrackFile }>(),
    'Remove Track File': props<{ trackFileId: string }>(),
  },
});
