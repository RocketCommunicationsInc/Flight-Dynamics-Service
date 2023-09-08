import { Component } from '@angular/core';
@Component({
  selector: 'app-scenario-data',
  templateUrl: './scenario-data.html',
  styleUrls: ['./scenario-data.css'],
})
export class ScenarioData {
  isDialogOpen: boolean = false;

  showDialog() {
    this.isDialogOpen = true;
  }
}
