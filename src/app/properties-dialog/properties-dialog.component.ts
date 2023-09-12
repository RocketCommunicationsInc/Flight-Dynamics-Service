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
        { value: '1', label: '5423' },
        { value: '2', label: '6543' },
        { value: '3', label: '7654' },
      ],
    },
    {
      cb: 'Epoch',
      options: [
        { value: 'julian', label: 'Julian' },
        { value: 'epoch', label: 'Epoch' },
        { value: 'time', label: 'HH:mm:ss' },
      ],
    },
    {
      cb: 'Mean Motion',
      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
    {
      cb: 'Longitude of Periapsis ',
      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
    {
      cb: 'True Anomaly',
      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
    {
      cb: 'Mean Anomaly',
      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
  ];
}
