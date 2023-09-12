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
      this.dialogService.selectedProperties.push(checkbox.value);
    } else {
      const itemIndex = this.dialogService.selectedProperties.indexOf(
        checkbox.checked,
      );
      if (itemIndex !== -1) {
        this.dialogService.selectedProperties.splice(itemIndex, 1);
      }
    }
  }

  dummyOptions = [
    {
      cb: 'Catalog ID',
    },
    {
      cb: 'Eccentricity',
    },
    {
      cb: 'Mass',
    },
    {
      cb: 'Raan',
      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
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
      cb: 'Perigee',
      options: [
        { value: 'deg', label: 'Meters' },
        { value: 'rad', label: 'Kilometers' },
        { value: 'rev', label: 'Miles' },
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
    {
      cb: 'Inclination',
      options: [
        { value: 'deg', label: 'Degree' },
        { value: 'rad', label: 'Radian' },
        { value: 'rev', label: 'Revolution' },
      ],
    },
    {
      cb: 'Semi-Major Axis',
      options: [
        { value: 'deg', label: 'Meters' },
        { value: 'rad', label: 'Kilometers' },
        { value: 'rev', label: 'Miles' },
      ],
    },
  ];
}
