import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spacecraft-table',
  templateUrl: './spacecraft-table.component.html',
  styleUrls: ['./spacecraft-table.component.css'],
})
export class SpacecraftTableComponent {
  @Output() onRuxchange: EventEmitter<any> = new EventEmitter()
  segmentedBtnData = [
    {
      label: 'View Table',
    },
    { label: 'View Graph' },
  ];

  selectedBtn: string = "Table";

  viewGraph(event: any): void {
    this.selectedBtn;
    console.log(this.selectedBtn, 'selected');
    console.log(event, 'event');
  }

  checkChange(event: any): void {
    this.onRuxchange.emit(event)
    alert('works')
    console.log(event,'change event works')
  }
}
