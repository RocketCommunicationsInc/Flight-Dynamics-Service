import { Component } from '@angular/core';

@Component({
  selector: 'app-spacecraft-file',
  templateUrl: './spacecraft-file.component.html',
  styleUrls: ['./spacecraft-file.component.css'],
})
export class SpacecraftFileComponent {
  selectedTab: string = 'inputs-tab';

  setTab(event: any) {
    if (event.target.id) {
      this.selectedTab = event.target.id;
    }
  }
}
