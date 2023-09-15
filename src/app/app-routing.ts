import { Route } from '@angular/router';
import { PropertiesDialogComponent } from './properties-dialog/properties-dialog.component';
import { LogUtilityComponent } from './main/utility-components/log-utility/log-utility.component';
import { InputsOutputsDataDisplayComponent } from './main/inputs-outputs-data-display/inputs-outputs-data-display.component';
import { CompareUtilityComponent } from './main/utility-components/compare-utility/compare-utility.component';
import { CreateReportUtilityComponent } from './main/utility-components/create-report-utility/create-report-utility.component';
import { TrackDataUtilityComponent } from './main/utility-components/track-data-utility/track-data-utility.component';
import { PropagatorUtilityComponent } from './main/utility-components/propagator-utility/propagator-utility.component';

export const Routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: InputsOutputsDataDisplayComponent,
  },
  {
    path: 'properties',
    outlet: 'dialog',
    component: PropertiesDialogComponent,
  },
  {
    path: 'log-util',
    outlet: 'log',
    component: LogUtilityComponent,
  },
  {
    path: 'compare-util',
    outlet: 'compare',
    component: CompareUtilityComponent,
  },
  {
    path: 'report-util',
    outlet: 'report',
    component: CreateReportUtilityComponent,
  },
  {
    path: 'track-util',
    outlet: 'track',
    component: TrackDataUtilityComponent,
  },
  {
    path: 'propagator-util',
    outlet: 'propagator',
    component: PropagatorUtilityComponent,
  },
];
