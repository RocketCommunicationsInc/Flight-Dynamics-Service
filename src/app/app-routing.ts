import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const Routes: Route[] = [
  { path: '', component: AppComponent },
  {
    path: 'properties',
    outlet: 'dialog',
  },
];
