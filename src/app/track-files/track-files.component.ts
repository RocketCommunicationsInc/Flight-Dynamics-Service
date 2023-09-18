import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { dummyFileData } from './dummy-file-data';

@Component({
  selector: 'fds-track-files',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './track-files.component.html',
  styleUrls: ['./track-files.component.css'],
})
export class TrackFilesComponent {
  dummyFileData = dummyFileData;

  selectedFileName: string = '';
  selectedFileContent: string = '';
  editedContent: string = '';
  editTrackFile: boolean = false;
  isFileSelected: boolean = false;

  handleSelect(file: any): void {
    file.selected = !file.selected;
    if (file.selected) {
      this.selectedFileName = file.fileName;
      this.selectedFileContent = file.content;
      this.isFileSelected = true;
    } else {
      this.selectedFileName = '';
      this.selectedFileContent = '';
      this.isFileSelected = false;
    }
  }

  handleClick() {
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
