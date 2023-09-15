import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogService } from '../services/dialog.service';
import { dummyOptions } from './dummy-data';

@Component({
  selector: 'app-properties-dialog',
  standalone: true,
  imports: [AstroComponentsModule, CommonModule],
  templateUrl: './properties-dialog.component.html',
  styleUrls: ['./properties-dialog.component.css'],
})
export class PropertiesDialogComponent {
  dummyOptions = dummyOptions;
  updatedProperties: any[] = [];
  constructor(
    private router: Router,
    private dialogService: DialogService,
  ) {
    this.updatedProperties = [
      'Catalog ID',
      'Eccentricity',
      'Mass',
      'Perigee',
      'Inclination',
      'Semi-Major Axis',
    ];
  }

  ngOnInit() {
    this.dialogService.getSelectedProperties().subscribe((checkedItems) => {
      this.dummyOptions.forEach((cb) => {
        cb.checked = checkedItems.includes(cb.cb);
        if (!cb.checked) {
          cb.disabled = !checkedItems.includes(cb.cb);
        }
      });
    });
  }

  checkedProperties: number = 6;

  updateDisabledValue() {
    const isDisabled = this.checkedProperties >= 6 ? true : false;
    this.dummyOptions.forEach((cb) => {
      const isChecked = this.updatedProperties.includes(cb.cb);
      if (isChecked) {
        cb.disabled = false;
      } else cb.disabled = isDisabled;
    });
  }

  onCheckboxSelection(event: any) {
    const checkbox = event.target as HTMLRuxCheckboxElement;

    if (checkbox.checked) {
      if (!this.updatedProperties.includes(checkbox.value)) {
        this.updatedProperties.push(checkbox.value);
        this.checkedProperties++;
      }
    } else {
      this.checkedProperties--;
      const index = this.updatedProperties.indexOf(checkbox.value);
      if (index !== -1) {
        this.updatedProperties.splice(index, 1);
      }
    }
    this.updateDisabledValue();
  }

  disableSave(): boolean {
    return this.updatedProperties.length < 6;
  }

  onSave() {
    this.dialogService.updatedProperties(this.updatedProperties);
    const dialog = document.getElementById('dialog');
    (dialog as HTMLRuxDialogElement).open = false;
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  onClose() {
    const dialog = document.getElementById('dialog');
    (dialog as HTMLRuxDialogElement).open = false;
    this.router.navigate([{ outlets: { dialog: null } }]);
  }
}
