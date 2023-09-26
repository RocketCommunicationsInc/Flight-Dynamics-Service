import { createSelector } from '@ngrx/store';
import { Spacecraft } from '../types/data.types';
import { ScenariosState } from './app.model';
import { selectScenarios } from './app.reducer';

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
