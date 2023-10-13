import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, HostBinding, ViewChild } from '@angular/core';
import { ScenarioDataDisplayComponent } from './core/scenario-data-display/scenario-data-display.component';
import { ScenarioLibraryComponent } from './core/scenario-library/scenario-library.component';
import { GlobalStatusBarComponent } from './core/global-status-bar/global-status-bar.component';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { AstroComponentsModule, RuxToastStack } from '@astrouxds/angular';
import { ToastConfig, ToastService } from './shared/toast.service';
import { UtilityToolkitComponent } from './main/utility-toolkit/utility-toolkit.component';
import { UtilityContainerComponent } from './main/utility-container/utility-container.component';
import {
  ScenariosActions,
  TrackFilesActions,
  AppActions,
  SpacecraftActions,
} from './+state/app.actions';

@Component({
  standalone: true,
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    ScenarioDataDisplayComponent,
    ScenarioLibraryComponent,
    GlobalStatusBarComponent,
    RouterLink,
    RouterOutlet,
    AstroComponentsModule,
    UtilityToolkitComponent,
    UtilityContainerComponent,
  ],
})
export class AppComponent {
  @HostBinding('class.light-theme') lightTheme: boolean = false;
  @ViewChild(RuxToastStack) toastStack?: HTMLRuxToastStackElement | null;
  currentToolkitPath: undefined | string;

  changeTheme() {
    this.lightTheme = !this.lightTheme;
  }

  constructor(
    private toasts: ToastService,
    private store: Store,
    private router: Router
  ) {
    this.store.dispatch(ScenariosActions.scenariosRequested());
    this.store.dispatch(SpacecraftActions.spacecraftsRequested());
    this.store.dispatch(TrackFilesActions.trackFilesRequested());
    this.store.dispatch(AppActions.initializeIds());
    this.toasts
      .getStack()
      .pipe(
        takeUntilDestroyed(),
        filter((val): val is ToastConfig => !!val)
      )
      .subscribe((config: ToastConfig) => this.toastStack?.addToast(config));

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(({ url }: NavigationEnd) => {
        this.currentToolkitPath = url.split('/')[2];
      });
  }
}
