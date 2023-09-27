import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AstroComponentsModule} from '@astrouxds/angular';
import { Store } from '@ngrx/store';
import { ScenariosActions, SpacecraftActions } from '../../+state/app.actions';
import { selectScenarios, selectSelectedScenarioId, selectSelectedSpacecraftId } from '../../+state/app.reducer';
import { selectAllSpacecrafts } from '../../+state/app.selectors';
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
  selectedSpacecraftId$: Observable<string | null>
  selectedScenario$: Observable<string | null>
  scenarios$: Observable<ScenariosState>;
  spacecrafts$ = this.store.select(selectAllSpacecrafts);
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
    this.selectedSpacecraftId$ = this.store.select(selectSelectedSpacecraftId)
    this.selectedScenario$ = this.store.select(selectSelectedScenarioId)
  }

  ngOnInit() {
    this.scenarios$.subscribe((res: any) => {
      this.scenarios = res.ids.map((id: string) => {
        return res.entities[id];
      });
    });

    this.selectedSpacecraftId$.subscribe((res: string|null) => {
      this.selectedSpacecraftId = res;
    });
    this.selectedScenario$.subscribe((res: string|null) => {
      this.selectedScenarioId = res;
    });

    this.spacecrafts$.subscribe((res: any) => {
      this.spacecraftData = res;
    });

    this.store.dispatch(
      SpacecraftActions.spacecraftIdSelected({
        spacecraftId: this.spacecraftData[0].id,
      })
    );
  }

  onScenarioClick(event: Event) {
    event.stopImmediatePropagation()
    const scenario = event.target as HTMLRuxTreeNodeElement
    scenario.setExpanded(true)
  }

  onSpacecraftSelected(spacecraft: Spacecraft, scenario: Scenario){
    this.store.dispatch(SpacecraftActions.spacecraftIdSelected({spacecraftId: spacecraft.id}))
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
