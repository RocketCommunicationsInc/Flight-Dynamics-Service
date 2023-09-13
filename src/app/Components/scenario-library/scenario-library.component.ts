import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scenario-library',
  templateUrl: './scenario-library.component.html',
  styleUrls: ['./scenario-library.component.css'],
})
export class ScenarioLibraryComponent {
  @Output() onSelected = new EventEmitter<any>();
  headerName = 'Scenarios';
  scenarios = [
    { name: 'A', spacecraft: [1, 2, 3, 4] },
    { name: 'B', spacecraft: [1, 2, 3, 4, 5] },
    { name: 'C', spacecraft: [1, 2, 3, 4, 6, 7] },
    { name: 'D', spacecraft: [1, 2, 3] },
    { name: 'E', spacecraft: [1, 2, 3, 4, 5] },
    { name: 'F', spacecraft: [1, 2, 3, 4, 5, 6] },
    { name: 'G', spacecraft: [1, 2] },
  ];

  handleSelected(scenario: string, spacecraft: any) {
    spacecraft = `Spacecraft ${scenario}-${spacecraft}`;
    this.onSelected.emit(spacecraft);
  }
}
