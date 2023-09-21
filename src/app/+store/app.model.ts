import { Scenario, TrackFile } from "../types/data.types";

export interface AppStore {
  scenarios: Scenario[],
  trackFiles: TrackFile[]
  satellites: Satellite[];
  selectedSatId: number | null;
}

export interface Satellite {
  catalogId: number;
}
