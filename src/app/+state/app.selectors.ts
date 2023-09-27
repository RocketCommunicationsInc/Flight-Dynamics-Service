import { createSelector } from '@ngrx/store';
import { Spacecraft } from '../types/data.types';
import { ScenariosState, TrackFilesState } from './app.model';
import { selectScenarios, selectTrackFiles } from './app.reducer';
import { scenarioAdapter, trackFileAdapter } from './app.adapters';

export const {selectAll: selectAllScenarios} = scenarioAdapter.getSelectors(selectScenarios)
export const {selectAll: selectAllTrackFiles} = trackFileAdapter.getSelectors(selectTrackFiles)

export const spacecraftSelector = createSelector(
  selectScenarios,
  (state: ScenariosState) => {
    let spacecrafts: Spacecraft[] = [];
    state.ids.map((id) => {
      state.entities[id]?.spaceCraft.map((craft) => spacecrafts.push(craft));
    });
    return spacecrafts;
  }
);
