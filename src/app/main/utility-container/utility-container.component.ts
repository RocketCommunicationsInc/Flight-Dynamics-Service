import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'fds-utility-container',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, RouterModule],
  templateUrl: './utility-container.component.html',
  styleUrls: ['./utility-container.component.css'],
})
export class UtilityContainerComponent {
  @Input({ required: true }) currentToolkitPath: undefined | string;
}
