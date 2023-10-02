import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCurrentSpacecraft, selectSelectedTrackFileId, selectTrackFileEntities } from 'src/app/+state/app.selectors';
import { TrackFileEntity } from 'src/app/types/data.types';
import { Subscription } from 'rxjs'
import { Filter } from 'src/app/types/Files';
import { TrackFilesActions } from 'src/app/+state/app.actions';

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
  trackFiles: TrackFileEntity = {}

  //filtering
  filteredIds: Filter[] = [];

  //editing
  editedContent: string = '';
  editTrackFile: boolean = false;
  selectedFileId: string | null = null;

  //sorting
  sortDirection: Sort = 'ASC';
  sortedColumn: any = '';
  showIcon: boolean = false;
  showSecondIcon: boolean = false;

  //subscription
  subscriptions: Subscription|null = null


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
    const sub3 = this.trackfileId$.subscribe((res)=> this.selectedFileId = res)
    this.subscriptions.add(sub2)
    this.subscriptions.add(sub3)

    this.filteredIds = this.currentTrackfileIds.map((id)=> ({id, checked: false, filtered: false, content:''}))
  }

  ngOnDestroy(){
    this.subscriptions?.unsubscribe()
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
  }

  onTrackSelect(event: Event, id:string) {
    const target = event.target as HTMLElement
    if(target.nodeName === "RUX-CHECKBOX") return;
    this.store.dispatch(TrackFilesActions.trackFileSelected({trackFileId: id}))
  }

  sortColumn(column:string) {
    if (column === this.sortedColumn) {
      if (column === 'creationDate') {
        this.showIcon = !this.showIcon;
      }
      if (column === 'fileSize') {
        this.showSecondIcon = !this.showSecondIcon;
      }
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'ASC';
    }

      this.filteredIds.sort((a: Filter, b: Filter) => {
        let itemA:number = 1
        let itemB:number = 0
        if(column === 'creationDate'){
          itemA = new Date(this.trackFiles[a.id].creationDate).getTime()
          itemB = new Date(this.trackFiles[b.id].creationDate).getTime()
        }

        if(column === 'fileSize'){
          itemA = this.trackFiles[a.id].fileSize
          itemB = this.trackFiles[b.id].fileSize
        }

        return this.sortDirection === 'ASC'
          ? itemA - itemB
          : itemB - itemA
      });
  }

  handleCheckbox(currentFilter: Filter): void {
    this.filteredIds = this.filteredIds.map(id => id === currentFilter ? {...id, checked: !id.checked} : id)
    //!Todo: What does the checkbox actually do?
  }

  handleSelectAll(event: Event) {
    const checkbox = event.target as HTMLRuxCheckboxElement;
      this.filteredIds = this.filteredIds.map((id) => (!id.filtered ? {...id, checked: checkbox.checked} : {...id}));
  }

  handleEdit() {
    //!Todo: what are we actually editing here? Right now it's just a 'content' flag thats not in app state
    this.editedContent = this.filteredIds.find(filter=> filter.id === this.selectedFileId)?.content || '';
    this.editTrackFile = true;
  }

  handleCancel() {
    this.editedContent = ''
    this.editTrackFile = false;
  }

  handleSave() {
    this.filteredIds = this.filteredIds.map(filter => filter.id === this.selectedFileId ? {...filter, content: this.editedContent} : filter);
    this.editTrackFile = false;
  }

}
