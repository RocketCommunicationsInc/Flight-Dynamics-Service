import { Component } from '@angular/core';

@Component({
  selector: 'app-data-inputs-outputs',
  templateUrl: './data-inputs-outputs.html',
  styleUrls: ['./data-inputs-outputs.css'],
})
export class DataInputsOutputs {
  selectedTab: string = 'inputs-tab';

  setTab(event: any) {
    if (event.target.id) {
      this.selectedTab = event.target.id;
    }
  }

  handleChange(event: any) {
    event.target.name = event.target.value;
  }

  handleSubmit(event: any) {
    alert('Determining Orbit');
  }
}
