import { Route } from '@angular/router';
import { LogUtilityComponent } from './main/utility-components/log-utility/log-utility.component';
import { InputsOutputsDataDisplayComponent } from './main/inputs-outputs-data-display/inputs-outputs-data-display.component';
import { CompareUtilityComponent } from './main/utility-components/compare-utility/compare-utility.component';
import { CreateReportUtilityComponent } from './main/utility-components/create-report-utility/create-report-utility.component';
import { TrackDataUtilityComponent } from './main/utility-components/track-data-utility/track-data-utility.component';
import { PropagatorUtilityComponent } from './main/utility-components/propagator-utility/propagator-utility.component';
// import { validSpacecraftGuard } from './guards/valid-satellite.guard';

export const Routes: Route[] = [
  {
    path: '',
    // canActivate: [validSpacecraftGuard],
    component: InputsOutputsDataDisplayComponent,
  },
  {
    path: ':id',
    // canActivate: [validSpacecraftGuard],
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
        path: 'compare',
        component: CompareUtilityComponent,
      },
      {
        path: 'report',
        component: CreateReportUtilityComponent,
      },
      {
        path: 'track',
        component: TrackDataUtilityComponent,
      },
      {
        path: 'propagator',
        component: PropagatorUtilityComponent,
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
