export interface AppStore {
  satellites: Satellite[];
  selectedSatId: number | null;
}

export interface Satellite {
  catalogId: number;
}
