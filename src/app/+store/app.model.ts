import { Scenario, Spacecraft, TrackFile } from '../types/data.types'
import { EntityState } from '@ngrx/entity'

export interface AppStore {
  scenarios: ScenariosState
  trackFiles: TrackFilesState
  spacecrafts: SpacecraftState
  selectedSpacecraftId: string | null
}

export interface ScenariosState extends EntityState<Scenario>{
  selectedScenarioId: string
}

export interface TrackFilesState extends EntityState<TrackFile>{
  selectedTrackFileId: string
}

export interface SpacecraftState extends EntityState<Spacecraft>{
  selectedSpacecraftId: string
}

export interface Satellite {
  catalogId: number
}
