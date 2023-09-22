import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSatellites } from '../+state/app.reducer';
import { map } from 'rxjs';
import { Satellite } from '../+state/app.model';

export const validSatelliteGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectSatellites).pipe(
    map((sats: Satellite[]) => {
      if(!route.params['id'] || !sats.find((sat) => sat.catalogId === parseInt(route.params['id']))) {
        return router.parseUrl(`/${sats[0].catalogId}`);
      }
      return true;
    }),
  );
};
