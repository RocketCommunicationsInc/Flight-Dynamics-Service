import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { ScenarioDataDisplayComponent } from './scenario-data-display/scenario-data-display.component'
import { ScenarioLibraryComponent } from './scenario-library/scenario-library.component'
import { GlobalStatusBarComponent } from './global-status-bar/global-status-bar.component'
import { MainComponent } from './main/main.component'
import { RouterLink, RouterOutlet } from '@angular/router'
import { AstroComponentsModule, RuxToastStack } from '@astrouxds/angular'
import { ToastConfig, ToastService } from './shared/toast.service'
import { BehaviorSubject, Subject, filter, takeUntil, tap } from 'rxjs'
import { mockScenarios, mockTrackFiles } from './mock-data/generate-data'

@Component({
  standalone: true,
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    ScenarioDataDisplayComponent,
    ScenarioLibraryComponent,
    GlobalStatusBarComponent,
    MainComponent,
    RouterLink,
    RouterOutlet,
    AstroComponentsModule,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class.light-theme') lightTheme: boolean = false
  @ViewChild(RuxToastStack) toastStack?: HTMLRuxToastStackElement | null
  destroyed = new Subject() // Cleans up subscriptions to avoid memory leaks

  changeTheme() {
    this.lightTheme = !this.lightTheme
  }

  constructor(private toasts: ToastService) {}

  ngOnInit() {
    this.toasts
      .getStack()
      .pipe(
        takeUntil(this.destroyed),
        filter((val): val is ToastConfig => !!val)
      )
      .subscribe((config: ToastConfig) => this.toastStack?.addToast(config))
  }

  ngOnDestroy(): void {
    this.destroyed.next(true)
    this.destroyed.complete()
  }
}
