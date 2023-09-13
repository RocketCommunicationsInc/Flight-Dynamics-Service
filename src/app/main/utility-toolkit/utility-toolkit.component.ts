import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

interface Utility {
  icon: string;
  label: string;
  onClick: (e: Event) => void;
}

@Component({
  selector: 'fds-utility-toolkit',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './utility-toolkit.component.html',
  styleUrls: ['./utility-toolkit.component.css'],
})
export class UtilityToolkitComponent {
  id = '000';

  utilities: Utility[] = [
    {
      icon: 'tune',
      label: 'Compare',
      onClick: (e) => console.log('do the Compare thingy', e),
    },
    {
      icon: 'tune',
      label: 'Create Report',
      onClick: (e) => console.log('do the Create Report thingy', e),
    },
    {
      icon: 'tune',
      label: 'Log',
      onClick: (e) => console.log('do the Log thingy', e),
    },
    {
      icon: 'tune',
      label: 'Track Data',
      onClick: (e) => console.log('do the Track Data thingy', e),
    },
    {
      icon: 'tune',
      label: 'Propagator',
      onClick: (e) => console.log('do the Propagator thingy', e),
    },
  ];
}
