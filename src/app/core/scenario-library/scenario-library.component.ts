import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { select, State, Store } from '@ngrx/store';
import { SpacecraftActions } from '../../+state/app.actions';
import { selectScenarios } from '../../+state/app.reducer';
import { spacecraftSelector } from '../../+state/app.selectors';
import { ToastService } from '../../shared/toast.service';
import { Scenario, Spacecraft } from '../../types/data.types';
import { Router } from '@angular/router';
import { TrackFilesComponent } from 'src/app/main/utility-components/track-data-utility/track-files/track-files.component';
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
  selectedCraft = signal<string | null>('');
  // scenarios$ = this.store.select(selectScenarios);
  scenarios$: Observable<ScenariosState>;
  spacecrafts$ = this.store.select(spacecraftSelector);
  data: (Scenario | undefined)[] = [];
  spacecraftData: any;

  constructor(
    private toasts: ToastService,
    private store: Store<AppStore>,
    private state: State<AppStore>,
    private router: Router
  ) {
    this.scenarios$ = this.store.pipe(select(selectScenarios));
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

    this.spacecraftData.map((spacecraft: Spacecraft) => {
      if (targetID === spacecraft.id) {
        this.store.dispatch(
          SpacecraftActions.spacecraftSelected({ spacecraft: spacecraft })
        );
      }
    });

    //!TODO This needs to be handled using state
    const el = e.target as HTMLRuxTreeNodeElement;
    const parentText = el.parentNode?.firstChild!.textContent?.trim();
    //We don't want to select the parent nodes, just the nodes being used as slots
    if (el.slot === 'node') {
      this.selectedCraft.set(el.textContent);
      this.router.navigateByUrl(
        `${parentText}-${el.textContent?.trim()}` || ''
      );
    }
    console.log(this.state);
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

  ngOnInit() {
    this.scenarios$.subscribe((res: any) => {
      this.data = res.ids.map((id: string) => {
        return res.entities[id];
      });
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
}
