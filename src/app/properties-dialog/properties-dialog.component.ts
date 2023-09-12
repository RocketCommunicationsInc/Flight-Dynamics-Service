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

  dummyOptions = [
    {
      cb: 'Individual Passes',
      options: [
        { value: 'km', label: 'Kilometer' },
        { value: 'm', label: 'Meters' },
        { value: 'mi', label: 'Miles' },
      ],
    },
    {
      cb: 'Epoch',
      options: [
        { value: 'km', label: 'Kilometer' },
        { value: 'm', label: 'Meters' },
        { value: 'mi', label: 'Miles' },
      ],
    },
    {
      cb: 'Mean Motion',
      options: [
        { value: 'km', label: 'Kilometer' },
        { value: 'm', label: 'Meters' },
        { value: 'mi', label: 'Miles' },
      ],
    },
    {
      cb: 'Longitude of Periapsis ',
      options: [
        { value: 'km', label: 'Kilometer' },
        { value: 'm', label: 'Meters' },
        { value: 'mi', label: 'Miles' },
      ],
    },
    {
      cb: 'True Anomaly',
      options: [
        { value: 'km', label: 'Kilometer' },
        { value: 'm', label: 'Meters' },
        { value: 'mi', label: 'Miles' },
      ],
    },
    {
      cb: 'Mean Anomaly',
      options: [
        { value: 'km', label: 'Kilometer' },
        { value: 'm', label: 'Meters' },
        { value: 'mi', label: 'Miles' },
      ],
    },
  ];
}
