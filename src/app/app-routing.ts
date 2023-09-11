import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { PropertiesDialogComponent } from './properties-dialog/properties-dialog.component';

export const Routes: Route[] = [
  { path: '', component: AppComponent },
  {
    path: 'properties-dialog',
    outlet: 'dialog',
    component: PropertiesDialogComponent,
  },
];
