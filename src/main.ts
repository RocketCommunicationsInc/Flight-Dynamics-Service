import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { Routes } from './app/app-routing';
import { provideState, provideStore } from '@ngrx/store';
import { satellitesFeature } from './app/+store/app.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(Routes),
    provideStore(),
    provideState(satellitesFeature),
  ],
});
