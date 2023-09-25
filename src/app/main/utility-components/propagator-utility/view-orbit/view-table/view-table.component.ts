import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'fds-view-table',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css'],
})
export class ViewTableComponent {}
