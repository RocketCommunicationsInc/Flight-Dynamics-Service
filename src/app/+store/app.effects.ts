import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ScenariosActions, TrackFilesActions } from './app.actions';
import { exhaustMap, map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { MockDataService } from '../api/mock-data.service';

const loadScenarios = createEffect(
  (scenarioService = inject(MockDataService)) =>
    inject(Actions).pipe(
      ofType(ScenariosActions.scenariosRequested),
      exhaustMap(() => {
        return scenarioService
          .getScenarios()
          .pipe(
            map((scenarios) => {
              return ScenariosActions.scenariosRetrieved({ scenarios })})
          )
          }),
        //   tap(val => console.log('scenarios', val))
        ),
  { functional: true }
);

const loadTrackFiles = createEffect(
    (trackFileService = inject(MockDataService)) =>
      inject(Actions).pipe(
        ofType(TrackFilesActions.trackFilesRequested),
        exhaustMap(() => {
          return trackFileService
            .getTrackFiles()
            .pipe(
              map((trackFiles) => {
                return TrackFilesActions.trackFilesRetrieved({ trackFiles })})
            )
            }),
            tap(val => console.log('track files', val))
          ),
    { functional: true }
  );

export const AppEffects = {
  loadScenarios,
  loadTrackFiles,
};
