export interface AppStore {
  //Selected sat ID should come from URL
  satellites: Satellite[];
}

export interface Satellite {
  catalogId: number;
}
