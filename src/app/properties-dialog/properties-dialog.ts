import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-properties-dialog',
  templateUrl: './properties-dialog.html',
  styleUrls: ['./properties-dialog.css'],
})
export class PropertiesDialog {
  @Input() openDialog = false;
}
