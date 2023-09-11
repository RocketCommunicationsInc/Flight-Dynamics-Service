import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { Routes } from './app/app-routing';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(Routes)],
});
