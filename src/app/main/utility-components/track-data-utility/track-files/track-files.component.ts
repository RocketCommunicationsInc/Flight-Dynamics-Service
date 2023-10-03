import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCurrentSpacecraft, selectSelectedTrackFileId, selectTrackFileEntities } from 'src/app/+state/app.selectors';
import { TrackFileEntity } from 'src/app/types/data.types';
import { Subscription } from 'rxjs'
import { Filter} from 'src/app/types/Files';
import { TrackFilesActions } from 'src/app/+state/app.actions';
import { TrackData, TrackFilesTableService } from '../track-files-table.service';

@Component({
  selector: 'fds-track-files',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, FormsModule],
  providers: [TrackFilesTableService],
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
  allIds: Filter[] = []
  data: TrackData[] = []

  //editing
  editedContent: string = '';
  editTrackFile: boolean = false;
  selectedFileId: string | null = null;

  //subscription
  subscriptions: Subscription|null = null



  constructor(private store: Store, public trackFilesTableService: TrackFilesTableService){
  }

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

    this.allIds = this.currentTrackfileIds.map((id)=> ({id, content:''}))
    this.data = this.allIds.map(id => {
      const trackfile = this.trackFiles[id.id]
      return {id: trackfile.id, creationDate: trackfile.creationDate, name: trackfile.name, fileSize: trackfile.fileSize, filtered: false}
    })

    this.trackFilesTableService.initialize(this.data);
  }

  ngOnDestroy(){
    this.subscriptions?.unsubscribe()
  }

  onSelect(event: any) {
    this.trackFilesTableService.filter(event.target.value);
  }

  onTrackSelect(event: Event, id:string) {
    if((event.target as HTMLElement).nodeName === "RUX-CHECKBOX") return;
    this.store.dispatch(TrackFilesActions.trackFileSelected({trackFileId: id}))
  }

  handleEdit() {
    //!Todo: what are we actually editing here? Right now it's just a 'content' flag thats not in app state
    this.editedContent = this.allIds.find(filter=> filter.id === this.selectedFileId)?.content || '';
    this.editTrackFile = true;
  }

  handleCancel() {
    this.editedContent = ''
    this.editTrackFile = false;
  }

  handleSave() {
    this.allIds = this.allIds.map(filter => filter.id === this.selectedFileId ? {...filter, content: this.editedContent} : filter);
    this.editTrackFile = false;
  }

}
