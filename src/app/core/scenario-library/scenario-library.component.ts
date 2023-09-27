import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AstroComponentsModule, RuxTreeNode } from '@astrouxds/angular';
import { State, Store } from '@ngrx/store';
import { ScenariosActions, SpacecraftActions } from '../../+state/app.actions';
import { selectScenarios, selectSelectedScenarioId, selectSelectedSpacecraft } from '../../+state/app.reducer';
import { spacecraftSelector } from '../../+state/app.selectors';
import { ToastService } from '../../shared/toast.service';
import { Scenario, Spacecraft } from '../../types/data.types';
import { Router } from '@angular/router';
import { AppStore, ScenariosState } from 'src/app/+state/app.model';
import { Observable } from 'rxjs';
@Component({
  standalone: true,
  selector: 'fds-scenario-library',
  templateUrl: './scenario-library.component.html',
  styleUrls: ['./scenario-library.component.css'],
  imports: [AstroComponentsModule, CommonModule],
})
export class ScenarioLibraryComponent {
  selectedSpacecraft$: Observable<Spacecraft | null>
  selectedScenario$: Observable<string | null>
  scenarios$: Observable<ScenariosState>;
  spacecrafts$ = this.store.select(spacecraftSelector);
  scenarios: (Scenario | undefined)[] = [];
  spacecraftData: any;
  selectedSpacecraftId: string|null = null
  selectedScenarioId: string|null = null

  constructor(
    private toasts: ToastService,
    private store: Store<AppStore>,
    private router: Router
  ) {
    this.scenarios$ = this.store.select(selectScenarios);
    this.selectedSpacecraft$ = this.store.select(selectSelectedSpacecraft)
    this.selectedScenario$ = this.store.select(selectSelectedScenarioId)
  }

  ngOnInit() {
    this.scenarios$.subscribe((res: any) => {
      this.scenarios = res.ids.map((id: string) => {
        return res.entities[id];
      });
    });

    this.selectedSpacecraft$.subscribe((res: Spacecraft|null) => {
      this.selectedSpacecraftId = res?.id || null;
    });
    this.selectedScenario$.subscribe((res: string|null) => {
      this.selectedScenarioId = res;
    });

    this.spacecrafts$.subscribe((res: any) => {
      this.spacecraftData = res;
    });

    this.store.dispatch(
      SpacecraftActions.spacecraftSelected({
        spacecraft: this.spacecraftData[0],
      })
    );
  }

  onScenarioClick(event: Event) {
    event.stopImmediatePropagation()
    const scenario = event.target as HTMLRuxTreeNodeElement
    scenario.setExpanded(true)
  }

  onSpacecraftSelected(spacecraft: Spacecraft, scenario: Scenario){
    this.store.dispatch(SpacecraftActions.spacecraftSelected({spacecraft}))
    this.store.dispatch(ScenariosActions.scenarioSelected({scenarioId: scenario.id}))

    this.router.navigateByUrl(
      `${scenario.name.trim()}-${spacecraft.catalogId.trim()}` || ''
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
