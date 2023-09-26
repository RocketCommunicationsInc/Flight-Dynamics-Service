import { Scenario, TrackFile } from '../types/data.types';
import { EntityState } from '@ngrx/entity';

export interface AppStore {
  scenarios: ScenariosState;
  trackFiles: TrackFilesState;
  spacecraftIds: number[];
  selectedSpacecraftId: string | null;
  selectedTrackFileId: string | null;
  selectedScenarioId: string | null;
}

export interface ScenariosState extends EntityState<Scenario> {}

export interface TrackFilesState extends EntityState<TrackFile> {}
