import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-properties-dialog',
  templateUrl: './properties-dialog.component.html',
  styleUrls: ['./properties-dialog.component.css'],
})
export class PropertiesDialogComponent {
  @Input() openDialog = false;
}
