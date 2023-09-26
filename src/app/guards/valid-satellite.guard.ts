import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSpacecraftIds } from '../+state/app.reducer';
import { map } from 'rxjs';

export const validSatelliteGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectSpacecraftIds).pipe(
    map((sats: number[]) => {
      if(!route.params['id'] || !sats.find((sat) => sat === parseInt(route.params['id']))) {
        return router.parseUrl(`/${sats[0]}`);
      }
      return true;
    }),
  );
};
