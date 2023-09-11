import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, HostListener } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
@Component({
  standalone: true,
  selector: 'app-scenario-library',
  templateUrl: './scenario-library.component.html',
  styleUrls: ['./scenario-library.component.css'],
  imports: [AstroComponentsModule, CommonModule],
})
export class ScenarioLibraryComponent {
  constructor(private toast: ElementRef) {}

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
  @HostListener('ruxtreenodeselected', ['$event.target'])
  onTreeNodeSelected(el: HTMLRuxTreeNodeElement) {
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
    const toastStack =
      this.toast.nativeElement.querySelector('rux-toast-stack');

    toastStack.addToast({
      message: 'This feature has not been implemented.',
      hideClose: false,
      closeAfter: 3000,
    });
  }
}
