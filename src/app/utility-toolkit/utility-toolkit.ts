import { Component } from '@angular/core';

@Component({
  selector: 'app-utility-toolkit',
  templateUrl: './utility-toolkit.html',
  styleUrls: ['./utility-toolkit.css'],
})
export class UtilityToolkit {
  isLogDialogOpen: boolean = false;
  isPropagatorDialogOpen: boolean = false;

  showLogDialog() {
    this.isLogDialogOpen = true;
  }

  showPropagatorDialog() {
    this.isPropagatorDialogOpen = true;
  }
}
