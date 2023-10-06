import { Route } from '@angular/router';
import { LogUtilityComponent } from './main/utility-components/log-utility/log-utility.component';
import { InputsOutputsDataDisplayComponent } from './main/inputs-outputs-data-display/inputs-outputs-data-display.component';
import { TrackDataUtilityComponent } from './main/utility-components/track-data-utility/track-data-utility.component';
import { validSpacecraftGuard } from './guards/valid-spacecraft.guard';

export const Routes: Route[] = [
  {
    path: '',
    canActivate: [validSpacecraftGuard],
    component: InputsOutputsDataDisplayComponent,
  },
  {
    path: ':id',
    canActivate: [validSpacecraftGuard],
    children: [
      {
        path: '',
        component: InputsOutputsDataDisplayComponent,
      },
      {
        path: 'log',
        component: LogUtilityComponent,
      },
      {
        path: 'track-data',
        component: TrackDataUtilityComponent,
      },
      {
        path: 'propagator',
        loadComponent: () =>
          import(
            './main/utility-components/propagator-utility/propagator-utility.component'
          ).then((mod) => mod.PropagatorUtilityComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
