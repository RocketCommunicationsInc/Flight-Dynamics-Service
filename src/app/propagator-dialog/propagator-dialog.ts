import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-propagator-dialog',
  templateUrl: './propagator-dialog.html',
  styleUrls: ['./propagator-dialog.css'],
})
export class PropagatorDialog {
  @Input() openDialog = false;

  selectedTab: string = 'input-source';

  tabSelect(event: any) {
    if (event.target.id) {
      this.selectedTab = event.target.id;
    }
  }
}
