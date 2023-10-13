import type { Scenario, Spacecraft, TrackFile } from '../types/data.types';
import { EntityState } from '@ngrx/entity';

export interface AppStore {
  scenarios: ScenariosState;
  spacecrafts: SpacecraftsState;
  trackFiles: TrackFilesState;
  selectedSpacecraftId: string | null;
  selectedTrackFileId: string | null;
  selectedScenarioId: string | null;
}

export interface ScenariosState extends EntityState<Scenario> {}

export interface SpacecraftsState extends EntityState<Spacecraft> {}

export interface TrackFilesState extends EntityState<TrackFile> {}
