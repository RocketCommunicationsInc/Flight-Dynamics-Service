import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Satellite } from './app.model';
import { Scenario, TrackFile } from '../types/data.types';

export const SatelliteActions = createActionGroup({
  source: 'Satellite',
  events: {
    'Satellites Retrieved': props<{ satellites: Satellite[] }>(),
    'Satellite Selected': props<{ satId: number }>(),
  },
});

export const ScenariosActions = createActionGroup({
  source: 'Scenarios',
  events: {
    'Scenarios Requested': emptyProps(),
    'Scenarios Retrieved': props<{ scenarios: Scenario[] }>(),
  },
});

export const TrackFilesActions = createActionGroup({
  source: 'Track Files',
  events: {
    'Track Files Requested': emptyProps(),
    'Track Files Retrieved': props<{ trackFiles: TrackFile[] }>(),
  },
});
