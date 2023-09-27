import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { select, State, Store } from '@ngrx/store';
import { SpacecraftActions } from '../../+state/app.actions';
import { selectScenarios } from '../../+state/app.reducer';
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
  scenarios$: Observable<ScenariosState>;
  spacecrafts$: Observable<Spacecraft[]>;

  scenarios: (Scenario | undefined)[] = [];
  spacecrafts: Spacecraft[] | undefined;
  selectedSpacecraft: Spacecraft | undefined;

  constructor(
    private toasts: ToastService,
    private store: Store<AppStore>,
    private router: Router
  ) {
    this.scenarios$ = this.store.pipe(select(selectScenarios));
    this.spacecrafts$ = this.store.select(selectAllSpacecrafts);
  }

  ngOnInit() {
    !(
      //TODO These both need to be unsubscribed but I'm not sure the best way to do that.
      this.scenarios$.subscribe((result: any) => {
        this.scenarios = result.ids.map((id: string) => {
          return result.entities[id];
        });
      })
    );

    this.spacecrafts$.subscribe((result: any) => {
      this.spacecrafts = result;
      this.selectedSpacecraft = result[0];
    });

    this.store.dispatch(
      SpacecraftActions.spacecraftIdSelected({
        spacecraftId: this.selectedSpacecraft!.id,
      })
    );
  }

  /**
   * Listen for the ruxtreenodeselected event and store the selected node in the selectedCraft signal
   * @param el the rux-tree-node element
   */
  onTreeNodeSelected(e: Event) {
    //!TODO This needs to be refactored to not access the DOM, ViewChild I think?
    const targetID: string = (e.target as HTMLRuxTreeNodeElement).getAttribute(
      'data-spacecraft'
    )!;

    this.spacecrafts?.map((spacecraft: Spacecraft) => {
      if (targetID === spacecraft.id) {
        this.store.dispatch(
          SpacecraftActions.spacecraftIdSelected({
            spacecraftId: spacecraft.id,
          })
        );
      }
    });

    //!TODO This needs to be handled using state
    const el = e.target as HTMLRuxTreeNodeElement;
    const parentText = el.parentNode?.firstChild!.textContent?.trim();
    //We don't want to select the parent nodes, just the nodes being used as slots
    if (el.slot === 'node') {
      this.router.navigateByUrl(
        `${parentText}-${el.textContent?.trim()}` || ''
      );
    }
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
