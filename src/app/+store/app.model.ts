import { Scenario, Spacecraft, TrackFile } from '../types/data.types'

export interface AppStore {
  scenarios: Scenario[]
  trackFiles: TrackFile[]
  spacecrafts: Spacecraft[]
  selectedSpacecraftId: string | null
}

export interface Satellite {
  catalogId: number
}
