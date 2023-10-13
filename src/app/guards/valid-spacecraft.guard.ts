import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAllScenarios } from '../+state/app.selectors';
import type { Scenario } from '../types/data.types';

export const validSpacecraftGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const scenarios$ = store.select(selectAllScenarios);

  const getRoutes = (scenarios: Scenario[]) => {
    let routes: string[] = [];
    scenarios.map((scenario) => {
      scenario.spaceCraftIds.map((craft) => {
        routes.push(
          `${scenario.name.trim().replace(/\s/g, '-')}-${craft.catalogId
            .trim()
            .replace(/\s/g, '-')}`
        );
      });
    });
    return routes;
  };

  return scenarios$.pipe(
    map((scenarios: Scenario[]) => {
      const validRoutes = getRoutes(scenarios);

      if (
        !route.params['id'] ||
        !validRoutes.find((validRoute) => validRoute === route.params['id'])
      ) {
        return router.parseUrl(`/${validRoutes[0]}`);
      }
      return true;
    })
  );
};
