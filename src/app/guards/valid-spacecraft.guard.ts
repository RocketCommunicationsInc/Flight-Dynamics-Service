import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectScenarios } from '../+state/app.reducer';
import { map } from 'rxjs';

export const validSpacecraftGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const scenarios$ = store.select(selectScenarios);

  return scenarios$.pipe(
    map((validRoute: any) => {
      console.log('valid', validRoute);
      if (
        !route.params['id'] ||
        !validRoute.find((sat) => sat === parseInt(route.params['id']))
      ) {
        return router.parseUrl(`/${validRoute[0]}`);
      }
      return true;
    })
  );
};

// scenarios.keys.map(key => ScenariosActions.entities[key])
