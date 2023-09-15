import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { PropertiesDialogComponent } from './properties-dialog/properties-dialog.component';
import { LogUtilityComponent } from './main/log-utility/log-utility.component';
import { MainComponent } from './main/main.component';
import { InputsOutputsDataDisplayComponent } from './main/inputs-outputs-data-display/inputs-outputs-data-display.component';

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
    pathMatch: 'full',
    component: LogUtilityComponent,
  },
];
