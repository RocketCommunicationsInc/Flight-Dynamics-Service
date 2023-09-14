import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-properties-dialog',
  standalone: true,
  imports: [AstroComponentsModule, CommonModule],
  templateUrl: './properties-dialog.component.html',
  styleUrls: ['./properties-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesDialogComponent {
  constructor(
    private router: Router,
    private dialogService: DialogService,
  ) {}

  @Output() saveSelection = new EventEmitter();

  onClose() {
    this.saveSelection.emit(this.dialogService.selectedProperties);
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  onCheckboxSelection(event: any) {
    const checkbox = event.target as HTMLRuxCheckboxElement;

    if (checkbox.checked) {
      if (!this.dialogService.selectedProperties.includes(checkbox.value)) {
        this.dialogService.selectedProperties.push(checkbox.value);
      }
    } else {
      const index = this.dialogService.selectedProperties.indexOf(
        checkbox.value,
      );
      if (index !== -1) {
        this.dialogService.selectedProperties.splice(index, 1);
      }
    }
  }

  disableCheckboxes(): boolean {
    return (
      this.dialogService.selectedProperties.filter((cb) => cb.checked === true)
        .length >= 6
    );
  }

  dummyOptions = [
    {
      cb: 'Catalog ID',
      checked: true,
    },
    {
      cb: 'Eccentricity',
      checked: true,
    },
    {
      cb: 'Mass',
      checked: true,
    },
    {
      cb: 'Raan',
      checked: false,
      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
    {
      cb: 'Mean Motion',
      checked: false,

      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
    {
      cb: 'Perigee',
      checked: true,
      options: [
        { value: 'deg', label: 'Meters' },
        { value: 'rad', label: 'Kilometers' },
        { value: 'rev', label: 'Miles' },
      ],
    },

    {
      cb: 'Longitude of Periapsis ',
      checked: false,

      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
    {
      cb: 'True Anomaly',
      checked: false,

      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
    {
      cb: 'Mean Anomaly',
      checked: false,

      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
    {
      cb: 'Inclination',
      checked: true,
      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
    {
      cb: 'Semi-Major Axis',
      checked: true,

      options: [
        { value: 'deg', label: 'Meters' },
        { value: 'rad', label: 'Kilometers' },
        { value: 'rev', label: 'Miles' },
      ],
    },
  ];
}
