import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrackFile } from 'src/app/types/data.types';

export type TrackData = TrackFile & {
  filtered: boolean
}

@Injectable({
  providedIn: 'root',
})
export class TrackFilesDataUtilityService {

  private checkedTrackFiles: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(['woo!'])

  constructor(){}

  get() {
    return this.checkedTrackFiles.asObservable()
  }

  set(newData: TrackFile[]): void{
    this.checkedTrackFiles.next(newData)
    console.log(newData, 'newData')
    console.log(this.checkedTrackFiles)
  }

  makeTrackData(data: TrackFile[]){
    return data.map((trackfile) => ({...trackfile, filtered: false}))
  }

}
