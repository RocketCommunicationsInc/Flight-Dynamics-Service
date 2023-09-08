import { Component } from '@angular/core';

@Component({
  selector: 'app-utility-toolkit',
  templateUrl: './utility-toolkit.html',
  styleUrls: ['./utility-toolkit.css'],
})
export class UtilityToolkit {
  isDialogOpen: boolean = false;

  showLogDialog() {
    this.isDialogOpen = true;
  }
}
