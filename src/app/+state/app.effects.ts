import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ScenariosActions,
  SpacecraftActions,
  TrackFilesActions,
} from './app.actions';
import { exhaustMap, map } from 'rxjs';
import { inject } from '@angular/core';
import { MockDataService } from '../api/mock-data.service';

const loadScenarios = createEffect(
  (scenarioService = inject(MockDataService)) =>
    inject(Actions).pipe(
      ofType(ScenariosActions.scenariosRequested),
      exhaustMap(() => {
        return scenarioService.getScenarios().pipe(
          map((scenarios) => {
            return ScenariosActions.scenariosRetrieved({ scenarios });
          })
        );
      })
    ),
  { functional: true }
);

const loadSpacecrafts = createEffect(
  (spacecraftService = inject(MockDataService)) =>
    inject(Actions).pipe(
      ofType(SpacecraftActions.spacecraftsRequested),
      exhaustMap(() => {
        return spacecraftService.getSpacecrafts().pipe(
          map((spacecrafts) => {
            return SpacecraftActions.spacecraftsRetrieved({ spacecrafts });
          })
        );
      })
    ),
  { functional: true }
);

const loadTrackFiles = createEffect(
  (trackFileService = inject(MockDataService)) =>
    inject(Actions).pipe(
      ofType(TrackFilesActions.trackFilesRequested),
      exhaustMap(() => {
        return trackFileService.getTrackFiles().pipe(
          map((trackFiles) => {
            return TrackFilesActions.trackFilesRetrieved({ trackFiles });
          })
        );
      })
    ),
  { functional: true }
);

export const AppEffects = {
  loadScenarios,
  loadSpacecrafts,
  loadTrackFiles,
};
