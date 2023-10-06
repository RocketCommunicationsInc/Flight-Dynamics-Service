import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableService, ColumnDefs } from 'src/app/shared/table.service';
import { TrackFile } from 'src/app/types/data.types';

export type TrackData = TrackFile & {
  filtered: boolean
}
@Injectable({
  providedIn: 'root',
})
export class TrackFilesTableService extends TableService<TrackData> {

  private tableData = new BehaviorSubject<TrackData[]>([])
  tableData$ = this.tableData.asObservable()

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

  trackDataForTable: TrackFile[] = []

  initialize(data: TrackFile[], columnDefs: ColumnDefs<any>[]){
    const trackdata = data.map((trackfile) => ({...trackfile, filtered: false}))
    this.trackDataForTable = trackdata
    this.init({
      columnDefs: columnDefs,
      data: trackdata
    });
  }

  override selectAll(): void {
    this.data = this.data.map((row) => ({...row, selected: true}))

  }

  selectFiltered(event: Event){
    const isChecked = (event.target as HTMLRuxCheckboxElement).checked;
    this.data = this.data.map(row => !row.filtered ? {...row, selected: isChecked} : row)
  }

  getTableData() {
    console.log(this.data, "data in service")
    const data = [...this.trackDataForTable]
    this.tableData.next(data as any[])
  }

  updateTableData(data: TrackFile[]) {
    // const trackdata = data.map((trackfile) => ({...trackfile, filtered: false}))
    // console.log(trackdata, "trackdata")
    // this.init({
    //   columnDefs: [],
    //   data: trackdata
    // });
    this.tableData.next(data as any[])
  }

}
