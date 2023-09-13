export interface AppStore {
  satellites: Satellite[];
  selectedSatId: number
}

export interface Satellite {
  catalogId: number;
}
