import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties-dialog',
  standalone: true,
  imports: [AstroComponentsModule, CommonModule],
  templateUrl: './properties-dialog.component.html',
  styleUrls: ['./properties-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesDialogComponent {
  constructor(private router: Router) {}

  onClose() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }
  
  dummyProperties = [
    { label: 'Spacecraft Property'},
    { label: 'Spacecraft Property'},
    { label: 'Spacecraft Property'},
    { label: 'Spacecraft Property'},
    { label: 'Spacecraft Property'},
    { label: 'Spacecraft Property'},
    { label: 'Spacecraft Property'},
  ]

  dummyOptions = [
   { cb: 'Individual Passes', option: 'Drop Down'},
   { cb: 'Data Display', option: 'Drop Down'},
   { cb: 'Data Display', option: 'Drop Down'},
   { cb: 'Data Display', option: 'Drop Down'},
   { cb: 'Data Display', option: 'Drop Down'},
   { cb: 'Data Display', option: 'Drop Down'},
  ]
}
