import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Satellite } from './app.model';

export const SatelliteActions = createActionGroup({
  source: 'Satellite',
  events: {
    'Satellites Requested': emptyProps(),
    'Satellites Retrieved': props<{ satellites: Satellite[] }>(),
  },
});
