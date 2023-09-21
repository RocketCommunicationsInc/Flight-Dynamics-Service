import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { Routes } from './app/app-routing';
import { provideState, provideStore } from '@ngrx/store';
import { AppReducer, appFeature } from './app/+store/app.reducer';
import { AppEffects } from './app/+store/app.effects';
import { provideEffects } from '@ngrx/effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(Routes),
    provideStore(),
    provideState(appFeature),
    provideEffects(AppEffects),
  ],
});
