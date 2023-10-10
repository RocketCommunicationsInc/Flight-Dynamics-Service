import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
@Component({
  selector: 'fds-sites',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent {
  @Input() isSitesDrawerOpen: boolean = false;

  handleFilter(event: any) {
   // const checkbox = event.target as HTMLRuxCheckboxElement;
  }
}
