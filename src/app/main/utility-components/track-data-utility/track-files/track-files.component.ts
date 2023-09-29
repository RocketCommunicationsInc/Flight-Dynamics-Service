import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { dummyFileData } from '../dummy-file-data';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCurrentSpacecraft, selectSelectedTrackFileId, selectTrackFileEntities } from 'src/app/+state/app.selectors';
import { TrackFile } from 'src/app/types/data.types';
import { Subscription } from 'rxjs'
import { Files } from 'src/app/types/Files';

type Sort = 'ASC' | 'DESC' | '';
@Component({
  selector: 'fds-track-files',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, FormsModule],
  templateUrl: './track-files.component.html',
  styleUrls: ['./track-files.component.css'],
})
export class TrackFilesComponent {
  trackFiles$ = this.store.select(selectTrackFileEntities)
  trackfileId$ = this.store.select(selectSelectedTrackFileId)
  currentSpacecraft$ = this.store.select(selectCurrentSpacecraft)
  currentTrackfileIds: string[] = []
  trackFiles: TrackFile[] = []

  //subscription
  subscriptions: Subscription|null = null

  selectedFileName: string = '';
  selectedFileContent: string = '';
  editedContent: string = '';
  editTrackFile: boolean = false;
  isFileSelected: boolean = false;
  allData: Files[] = [];
  filteredData: Files[] = [];
  filteredFiles: Files[] = [];

  sortDirection: Sort = 'ASC';
  sortedColumn: string = '';
  showIcon: boolean = false;
  showSecondIcon: boolean = false;

  constructor(private store: Store){}

  ngOnInit(){
    this.subscriptions = this.currentSpacecraft$.subscribe((res)=> this.currentTrackfileIds = res ? [...res.trackFileIds]: [])
    const sub2 = this.trackFiles$.subscribe((res)=>{
        if(this.currentTrackfileIds.length < 1 || !res) return;
        this.trackFiles = this.currentTrackfileIds.map((id) => res[id]!)
      }
    )
    this.subscriptions.add(sub2)
    this.allData = this.trackFiles.map((file)=> ({...file, selected: false, content:''}))
    this.filteredData = this.allData
    console.log(this.trackFiles)
  }

  ngOnDestroy(){
    this.subscriptions?.unsubscribe()
  }

  handleFilter(selection: string): Files[] {
    const today = new Date();
    const within7Days = new Date();
    const within30Days = new Date();
    const within90Days = new Date();
    within7Days.setDate(today.getDate() - 7);
    within30Days.setDate(today.getDate() - 30);
    within90Days.setDate(today.getDate() - 90);

    if (selection === 'all') {
      return (this.filteredData = this.allData);
    }

    if (selection === 'seven-days') {
      this.filteredData = this.allData.filter((file) => {
        return file.creationDate <= today && file.creationDate >= within7Days;
      });
    }
    if (selection === 'thirty-days') {
      this.filteredData = this.allData.filter((file) => {
        return file.creationDate <= today && file.creationDate >= within30Days;
      });
    }
    if (selection === 'ninety-days') {
      this.filteredData = this.allData.filter((file) => {
        return file.creationDate <= today && file.creationDate >= within90Days;
      });
    }

    return this.filteredData;
  }

  onSelect(event: any) {
    this.filteredFiles = this.handleFilter(event.target.value);
  }

  sortColumn(column: string) {
    if (column === this.sortedColumn) {
      if (column === 'date') {
        this.showIcon = !this.showIcon;
      }
      if (column === 'size') {
        this.showSecondIcon = !this.showSecondIcon;
      }
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'ASC';
    }
    this.filteredData.sort((a: any, b: any) => {
      return this.sortDirection === 'ASC'
        ? a[this.sortedColumn] - b[this.sortedColumn]
        : b[this.sortedColumn] - a[this.sortedColumn];
    });
  }

  handleCheckbox(file: any): void {
    const selectedCB = this.filteredData.filter((cb) => cb.selected);
    file.selected = !file.selected;
    if (file.selected) {
      this.selectedFileName = file.fileName;
      this.selectedFileContent = file.content;
      this.isFileSelected = true;
    } else if (selectedCB.length > 1 && this.selectedFileName) {
      //if there are multiple checkboxes selected and you uncheck one, the selected file/content will default to first item in the array
      this.selectedFileName = selectedCB[0].name;
      this.selectedFileContent = selectedCB[0].content;
    } else {
      this.selectedFileName = '';
      this.selectedFileContent = '';
      this.isFileSelected = false;
    }
  }

  handleSelectAll(event: any) {
    const checkbox = event.target as HTMLRuxCheckboxElement;
    if (checkbox.checked) {
      this.filteredData.forEach((cb) => (cb.selected = true));
    } else this.filteredData.forEach((cb) => (cb.selected = false));
  }

  handleEdit() {
    this.editTrackFile = true;
  }

  handleCancel() {
    this.editTrackFile = false;
  }

  handleSave() {
    this.selectedFileContent = this.editedContent;
    this.editTrackFile = false;
  }

  handleTextarea(event: any) {
    if (event.target.value) {
      this.editedContent = event.target.value;
    }
  }
}
