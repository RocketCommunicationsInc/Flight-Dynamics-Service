import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableService, ColumnDefs } from 'src/app/shared/table.service';

export interface TrackData { id: string, creationDate: Date, fileSize: number, name: string, filtered: boolean}


@Injectable({
  providedIn: 'root',
})
export class TrackFilesTableService extends TableService<TrackData> {
  columnDefs: ColumnDefs<TrackData>[] = [
    { header: '', field: 'id' },
    { header: 'File Name', field: 'name', sortable: true },
    { header: 'Date', field: 'creationDate', sortable: true },
    { header: 'File Size', field: 'fileSize', sortable: true },
  ];

  constructor(private store: Store){
    super()
  }

  filter(selection: string): void {
    const today = new Date();
    const within7Days = new Date();
    const within30Days = new Date();
    const within90Days = new Date();
    within7Days.setDate(today.getDate() - 7);
    within30Days.setDate(today.getDate() - 30);
    within90Days.setDate(today.getDate() - 90);

    let newData = [...this.data]

    if (selection === 'all') {
      newData = this.data.map(row => ({...row, filtered: false}))
    }

    if (selection === 'seven-days') {
      newData = this.data.map((row) => row.creationDate >= within7Days ? {...row, filtered: false} : {...row, filtered: true});
    }

    if (selection === 'thirty-days') {
      newData = this.data.map((row) => row.creationDate >= within30Days ? {...row, filtered: false} : {...row, filtered: true});
    }

    if (selection === 'ninety-days') {
      newData = this.data.map((row) => row.creationDate >= within90Days ? {...row, filtered: false} : {...row, filtered: true});
    }

    this.data = newData
  }

  initialize(data: TrackData[]){
    this.init({
      columnDefs: this.columnDefs,
      data: data
    });
  }

}
