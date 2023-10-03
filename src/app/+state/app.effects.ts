import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ScenariosActions, TrackFilesActions } from './app.actions';
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
  loadTrackFiles,
};
