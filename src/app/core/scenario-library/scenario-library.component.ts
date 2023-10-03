import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Store } from '@ngrx/store';
import {
  ScenariosActions,
  SpacecraftActions,
  TrackFilesActions,
} from '../../+state/app.actions';
import {
  selectAllScenarios,
  selectSelectedSpacecraftId,
} from '../../+state/app.selectors';
import { ToastService } from '../../shared/toast.service';
import { Scenario, Spacecraft } from '../../types/data.types';
import { Router } from '@angular/router';
import { AppStore } from 'src/app/+state/app.model';
import { Observable } from 'rxjs';
@Component({
  standalone: true,
  selector: 'fds-scenario-library',
  templateUrl: './scenario-library.component.html',
  styleUrls: ['./scenario-library.component.css'],
  imports: [AstroComponentsModule, CommonModule],
})
export class ScenarioLibraryComponent {
  selectedSpacecraftId$: Observable<string | null> = this.store.select(
    selectSelectedSpacecraftId
  );
  scenarios$: Observable<Scenario[]> = this.store.select(selectAllScenarios);

  constructor(
    private toasts: ToastService,
    private store: Store<AppStore>,
    private router: Router
  ) {}

  onScenarioClick(event: Event) {
    event.stopImmediatePropagation();
    const scenario = event.target as HTMLRuxTreeNodeElement;
    scenario.setExpanded(!scenario.expanded);
  }

  onSpacecraftSelected(spacecraft: Spacecraft, scenario: Scenario) {
    this.store.dispatch(
      SpacecraftActions.spacecraftIdSelected({ spacecraftId: spacecraft.id })
    );
    this.store.dispatch(
      ScenariosActions.scenarioSelected({ scenarioId: scenario.id })
    );
    this.store.dispatch(
      TrackFilesActions.trackFileSelected({
        trackFileId: spacecraft.trackFileIds[0],
      })
    );

    this.store.dispatch(
      TrackFilesActions.trackFileSelected({
        trackFileId: spacecraft.trackFileIds[0],
      })
    );

    this.router.navigateByUrl(
      `${scenario.name.trim().replace(/\s/g, '-')}-${spacecraft.catalogId
        .trim()
        .replace(/\s/g, '-')}` || ''
    );
  }

  onIconClick() {
    this.showToast();
  }

  /**
   * Show the 'feature not implemented' toast.
   */
  showToast() {
    this.toasts.addToast({
      message: 'This feature has not been implemented.',
      hideClose: false,
      closeAfter: 3000,
    });
  }
}
