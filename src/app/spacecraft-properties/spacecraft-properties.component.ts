import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-spacecraft-properties',
  templateUrl: './spacecraft-properties.component.html',
  styleUrls: ['./spacecraft-properties.component.css'],
})
export class SpacecraftPropertiesComponent {
  // constructor(private dialog: RuxDialog) {}
  isDialogOpen: boolean = false;

  constructor(private dialog: ElementRef) {}

  openDialog() {
    this.dialog.nativeElement.querySelector('rux-dialog');
  }

  showDialog() {
    this.openDialog();
    //alert('Clicked')
  }
}
