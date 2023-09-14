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
      'Catalog Id',
      'Eccentricity',
      'Mass',
      'Perigee',
      'Inclination',
      'Semi-Major Axis',
    ];
  }

  // disableCheckboxes(checkbox: HTMLRuxCheckboxElement) {
  //   if(this.checkedProperties === 6) {
  //     if(!checkbox.checked) {
  //       checkbox.disabled = true
  //     } else {
  //       checkbox.disabled = false
  //     }
  //   }
  //  else {checkbox.disabled = false
  // }
  //   // return (
  //   //    this.checkedProperties >= 6 && !checkbox.checked
  //   // )
  // }

  disabledCheckboxes: boolean[] = this.dummyOptions.map((cb) => !cb.checked);

  checkedProperties: number = 6;

  updateDisabledValue() {

    // const isDisabled = this.checkedProperties >= 6 ? false : true
    // this.dummyOptions.forEach((cb) => {
    //   if(!cb.checked) {
    //     cb.disabled = isDisabled
    //   }
    // })
    // const uncheckedCheckboxes = this.dummyOptions.filter((cb) => !cb.checked)
    // this.dummyOptions.forEach((cb) => {
    //   if(this.checkedProperties >= 6 || cb.checked) {
    //     cb.disabled = false
    //   } else {
    //     cb.disabled = true
    //   }
    // })

// if(this.checkedProperties < 6) {
//   this.dummyOptions.forEach((cb, index) => {
//     if(!cb.checked) {
//       this.disabledCheckboxes[index] = true
//     }
//   })
// } else {
//   this.disabledCheckboxes = this.dummyOptions.map((cb) => cb.checked)
// }


    this.dummyOptions.forEach((property) => {
      if (this.checkedProperties < 6) {
        property.disabled = false;
      } else if (!property.checked) {
        property.disabled = true;
      } else {
        property.disabled = false;
      }
    });
  }

  onCheckboxSelection(event: any) {
    const checkbox = event.target as HTMLRuxCheckboxElement;
    const indexVal = this.updatedProperties.indexOf(
      (cb: any) => cb.label === cb.value,
    );
    if (checkbox.checked) {
      if (!this.updatedProperties.includes(checkbox.value)) {
        this.updatedProperties.push(checkbox.value);
        this.checkedProperties++;
        // this.disabledCheckboxes[indexVal]= false
      }
    } else {
      this.checkedProperties--;
      // this.disabledCheckboxes[indexVal]= true
      const index = this.updatedProperties.indexOf(checkbox.value);

      if (index !== -1) {
        this.updatedProperties.splice(index, 1);
      }
    }
    this.checkedProperties = Math.max(this.checkedProperties, 0);
    this.updateDisabledValue();
    // const isDisabled = this.disableCheckboxes(checkbox)
    // checkbox.disabled = isDisabled
    // this.disableCheckboxes(checkbox)
  }

  disableSave(): boolean {
    return this.updatedProperties.length < 6;
  }

  onSave() {
    this.dialogService.updatedProperties(this.updatedProperties);
    this.dialogService.getSelectedProperties();
    const dialog = document.getElementById('dialog');
    (dialog as HTMLRuxDialogElement).open = false;
    this.router.navigate([{ outlets: { dialog: null } }]);
    console.log(this.dialogService.getSelectedProperties(), 'on save- the final array');
  }

  onClose() {
    const dialog = document.getElementById('dialog');
    (dialog as HTMLRuxDialogElement).open = false;
    this.router.navigate([{ outlets: { dialog: null } }]);
  }
}
