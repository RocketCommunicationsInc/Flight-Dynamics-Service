import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Scenario, Spacecraft, TrackFile } from '../types/data.types'

export const SpacecraftActions = createActionGroup({
  source: 'Spacecraft',
  events: {
    'Spacecrafts Requested': emptyProps(),
    'Spacecrafts Retrieved': props<{ spacecrafts: Spacecraft[] }>(),
    'Spacecraft Selected': props<{ spacecraftId: string }>(),
  },
})

export const ScenariosActions = createActionGroup({
  source: 'Scenarios',
  events: {
    'Scenarios Requested': emptyProps(),
    'Scenarios Retrieved': props<{ scenarios: Scenario[] }>(),
  },
})

export const TrackFilesActions = createActionGroup({
  source: 'Track Files',
  events: {
    'Track Files Requested': emptyProps(),
    'Track Files Retrieved': props<{ trackFiles: TrackFile[] }>(),
  },
})
