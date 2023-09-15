import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { LogUtilityDialogComponent } from 'src/app/log-utility-dialog/log-utility-dialog.component';

interface Utility {
  icon: string;
  label: string;
  onClick: (e: Event) => void;
}

@Component({
  selector: 'fds-utility-toolkit',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, LogUtilityDialogComponent],
  templateUrl: './utility-toolkit.component.html',
  styleUrls: ['./utility-toolkit.component.css'],
})
export class UtilityToolkitComponent {
  id = '000';
  isLogDialogOpen: boolean = false;

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
      onClick: () => (this.isLogDialogOpen = true),
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
