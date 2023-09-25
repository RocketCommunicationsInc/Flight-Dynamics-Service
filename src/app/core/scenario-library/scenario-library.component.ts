import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Store } from '@ngrx/store';
import { SpacecraftActions } from '../../+state/app.actions';
import { selectScenarios } from '../../+state/app.reducer';
import { ToastService } from '../../shared/toast.service';
import { Scenario } from '../../types/data.types';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'fds-scenario-library',
  templateUrl: './scenario-library.component.html',
  styleUrls: ['./scenario-library.component.css'],
  imports: [AstroComponentsModule, CommonModule],
})
export class ScenarioLibraryComponent {
  selectedCraft = signal<string | null>('');
  scenarios$ = this.store.select(selectScenarios);
  data: (Scenario | undefined)[] = [];

  constructor(
    private toasts: ToastService,
    private store: Store,
    private router: Router
  ) {}

  /**
   * Listen for the ruxtreenodeselected event and store the selected node in the selectedCraft signal
   * @param el the rux-tree-node element
   */
  onTreeNodeSelected(e: Event) {
    const el = e.target as HTMLRuxTreeNodeElement;
    //We don't want to select the parent nodes, just the nodes being used as slots
    if (el.slot === 'node') {
      this.selectedCraft.set(el.textContent);
      this.router.navigateByUrl(el.textContent?.trim() || '');
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

  ngOnInit() {
    this.scenarios$.subscribe((res: any) => {
      this.data = res.ids.map((id: string) => {
        return res.entities[id];
      });
    });
    this.store.dispatch(
      SpacecraftActions.spacecraftSelected({ spacecraftId: '123' })
    );
  }
}
