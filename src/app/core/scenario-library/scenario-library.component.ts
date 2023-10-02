import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Store} from '@ngrx/store';
import { ScenariosActions, SpacecraftActions, TrackFilesActions } from '../../+state/app.actions';
import {
  selectAllSpacecrafts,
  selectScenarios,
  selectSelectedSpacecraftId,
} from '../../+state/app.selectors';
import { ToastService } from '../../shared/toast.service';
import { Scenario, Spacecraft, SpacecraftEntity } from '../../types/data.types';
import { Router } from '@angular/router';
import { AppStore, ScenariosState } from 'src/app/+state/app.model';
import { Observable, Subscription } from 'rxjs';
@Component({
  standalone: true,
  selector: 'fds-scenario-library',
  templateUrl: './scenario-library.component.html',
  styleUrls: ['./scenario-library.component.css'],
  imports: [AstroComponentsModule, CommonModule],
})
export class ScenarioLibraryComponent {
  selectedSpacecraftId$: Observable<string | null>;
  scenarios$: Observable<ScenariosState>;
  spacecrafts$: Observable<SpacecraftEntity>;
  scenarios: (Scenario | undefined)[] = [];
  spacecraftData: any;
  selectedSpacecraftId: string | null = null;

  //subscriptions
  spacecraftSub: Subscription | null = null
  scenariosSub: Subscription | null = null
  spacecraftsSub: Subscription | null = null

  constructor(
    private toasts: ToastService,
    private store: Store<AppStore>,
    private router: Router
  ) {
    this.scenarios$ = this.store.select(selectScenarios);
    this.selectedSpacecraftId$ = this.store.select(selectSelectedSpacecraftId);
    this.spacecrafts$ = this.store.select(selectAllSpacecrafts);
  }

  ngOnInit() {
    this.scenariosSub = this.scenarios$.subscribe((res: any) => {
      this.scenarios = res.ids.map((id: string) => {
        return res.entities[id];
      });
    });

    this.spacecraftSub = this.selectedSpacecraftId$.subscribe((res: string | null) => {
      this.selectedSpacecraftId = res;
    });

    this.spacecraftsSub = this.spacecrafts$.subscribe((res: any) => {
      this.spacecraftData = res;
    });
  }

  ngOnDestroy(){
    this.spacecraftSub?.unsubscribe()
    this.spacecraftsSub?.unsubscribe()
    this.scenariosSub?.unsubscribe()
  }

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
      TrackFilesActions.trackFileSelected({ trackFileId: spacecraft.trackFileIds[0] })
    );

    this.router.navigateByUrl(
      `${scenario.name.trim().replace(/\s/g, '-')}-${spacecraft.catalogId.trim().replace(/\s/g, '-')}` || ''
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
