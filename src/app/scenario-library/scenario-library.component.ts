import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { AstroComponentsModule, RuxToastStack } from '@astrouxds/angular';
@Component({
  standalone: true,
  selector: 'app-scenario-library',
  templateUrl: './scenario-library.component.html',
  styleUrls: ['./scenario-library.component.css'],
  imports: [AstroComponentsModule, CommonModule],
})
export class ScenarioLibraryComponent {
  @ViewChild(RuxToastStack) toastStack?: HTMLRuxToastStackElement | null;

  selectedCraft = signal<string | null>('');

  dummyScenariosData = [
    {
      parent: 'Scenario A',
      children: ['Spacecraft #', 'Spacecraft #', 'Spacecraft #'],
    },
    {
      parent: 'Scenario B',
      children: [
        'Spacecraft #',
        'Spacecraft #',
        'Spacecraft #',
        'Spacecraft #',
      ],
    },
    {
      parent: 'Scenario C',
      children: ['Spacecraft #', 'Spacecraft #', 'Spacecraft #'],
    },
    {
      parent: 'Scenario D',
      children: [
        'Spacecraft #',
        'Spacecraft #',
        'Spacecraft #',
        'Spacecraft #',
        'Spacecraft #',
      ],
    },
    {
      parent: 'Scenario E',
      children: ['Spacecraft #', 'Spacecraft #', 'Spacecraft #'],
    },
    {
      parent: 'Scenario F',
      children: ['Spacecraft #', 'Spacecraft #', 'Spacecraft #'],
    },
  ];

  /**
   * Listen for the ruxtreenodeselected event and store the selected node in the selectedCraft signal
   * @param el the rux-tree-node element
   */
  onTreeNodeSelected(e: Event) {
    const el = e.target as HTMLRuxTreeNodeElement;
    //We don't want to select the parent nodes, just the nodes being used as slots
    if (el.slot === 'node') this.selectedCraft.set(el.textContent);
  }

  onIconClick() {
    this.showToast();
  }

  /**
   * Show the 'feature not implemented' toast.
   */
  showToast() {
    if (this.toastStack) {
      this.toastStack.addToast({
        message: 'This feature has not been implemented.',
        hideClose: false,
        closeAfter: 3000,
      });
    }
  }
}
