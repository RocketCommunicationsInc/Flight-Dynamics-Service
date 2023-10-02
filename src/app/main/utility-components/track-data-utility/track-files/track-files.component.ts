import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCurrentSpacecraft, selectSelectedTrackFileId, selectTrackFileEntities } from 'src/app/+state/app.selectors';
import { TrackFile, TrackFileEntity } from 'src/app/types/data.types';
import { Subscription } from 'rxjs'
import { Filter } from 'src/app/types/Files';

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
  trackFiles:TrackFileEntity = {}

  //subscription
  subscriptions: Subscription|null = null

  selectedFileName: string = '';
  selectedFileContent: string = '';
  editedContent: string = '';
  editTrackFile: boolean = false;
  isFileSelected: boolean = false;
  filteredIds: Filter[] = [];
  filteredTrackFiles: TrackFile[] = []

  sortDirection: Sort = 'ASC';
  sortedColumn: string = '';
  showIcon: boolean = false;
  showSecondIcon: boolean = false;

  constructor(private store: Store){}

  ngOnInit(){
    this.subscriptions = this.currentSpacecraft$.subscribe((res)=> this.currentTrackfileIds = res ? [...res.trackFileIds]: [])
    const sub2 = this.trackFiles$.subscribe((res)=>{
        if(this.currentTrackfileIds.length < 1 || !res) return;

        let currentTrackFiles = {}
        this.currentTrackfileIds.map(id =>{
          if (res[id]) currentTrackFiles = {...currentTrackFiles, [id]: res[id]}
        })
        this.trackFiles = currentTrackFiles
      }
    )
    this.subscriptions.add(sub2)

    this.filteredIds = this.currentTrackfileIds.map((id)=> ({id, selected: false, filtered: false, content:''}))
    console.log(this.trackFiles)
  }

  ngOnDestroy(){
    this.subscriptions?.unsubscribe()
  }

  filterTrackFiles(){
    const filteredIds = this.filteredIds.filter(id => !id.filtered)
    return this.filteredTrackFiles = filteredIds.map(id => this.trackFiles[id.id]);
  }

  handleFilter(selection: string): Filter[] {
    const today = new Date();
    const within7Days = new Date();
    const within30Days = new Date();
    const within90Days = new Date();
    within7Days.setDate(today.getDate() - 7);
    within30Days.setDate(today.getDate() - 30);
    within90Days.setDate(today.getDate() - 90);

    let newFilteredIds = this.filteredIds

    if (selection === 'all') {
      newFilteredIds = this.filteredIds.map(id => ({...id, filtered: false}))
    }

    if (selection === 'seven-days') {
      newFilteredIds = this.filteredIds.map((id) => {
       return this.trackFiles[id.id].creationDate >= within7Days ?
         {...id, filtered: false} : {...id, filtered: true}
      });
    }
    if (selection === 'thirty-days') {
      newFilteredIds = this.filteredIds.map((id) => {
        return this.trackFiles[id.id].creationDate >= within30Days ?
          {...id, filtered: false} : {...id, filtered: true}
       });
    }
    if (selection === 'ninety-days') {
      newFilteredIds = this.filteredIds.map((id) => {
        return this.trackFiles[id.id].creationDate >= within90Days ?
          {...id, filtered: false} : {...id, filtered: true}
       });
    }

    return newFilteredIds;
  }

  onSelect(event: any) {
    this.filteredIds = this.handleFilter(event.target.value);
    this.filterTrackFiles()
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
    this.filteredTrackFiles.sort((a: any, b: any) => {
      return this.sortDirection === 'ASC'
        ? a[this.sortedColumn] - b[this.sortedColumn]
        : b[this.sortedColumn] - a[this.sortedColumn];
    });
  }

  handleCheckbox(file: any): void {
    const selectedCB = this.filteredIds.filter((cb) => cb.selected);
    file.selected = !file.selected;
    if (file.selected) {
      this.selectedFileName = file.fileName;
      this.selectedFileContent = file.content;
      this.isFileSelected = true;
    } else if (selectedCB.length > 1 && this.selectedFileName) {
      //if there are multiple checkboxes selected and you uncheck one, the selected file/content will default to first item in the array
      this.selectedFileName = this.trackFiles[selectedCB[0].id].name;
      //!TODO: Content should be.. what? When you edit a file what should you edit?
      this.selectedFileContent = this.trackFiles[selectedCB[0].id].ephemerisSourceFile.name
    } else {
      this.selectedFileName = '';
      this.selectedFileContent = '';
      this.isFileSelected = false;
    }
  }

  handleSelectAll(event: any) {
    const checkbox = event.target as HTMLRuxCheckboxElement;
    let newFilteredIds = this.filteredIds
    if (checkbox.checked) {
      newFilteredIds = this.filteredIds.map((id) => (!id.filtered ? {...id, selected: true} : {...id}));
    } else newFilteredIds = this.filteredIds.map((id) => (!id.filtered ? {...id, selected: false}: {...id}));

    this.filteredIds = newFilteredIds
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
