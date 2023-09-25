import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { Routes } from './app/app-routing';
import { provideState, provideStore } from '@ngrx/store';
import { AppEffects } from './app/+state/app.effects';
import { provideEffects } from '@ngrx/effects';
import { appFeature } from './app/+state/app.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(Routes),
    provideStore(),
    provideState(appFeature),
    provideEffects(AppEffects),
  ],
});
