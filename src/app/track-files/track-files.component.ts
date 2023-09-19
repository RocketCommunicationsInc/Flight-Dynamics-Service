import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { dummyFileData } from './dummy-file-data';
import { FormsModule } from '@angular/forms';
import { Files } from '../types/Files';

type Sort = 'ASC' | 'DESC' | '';
@Component({
  selector: 'fds-track-files',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, FormsModule],
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
  filteredData: Files[] = this.dummyFileData;
  filteredFiles: Files[] = [];

  sortDirection: Sort = 'ASC';
  sortedColumn: string = '';
  showIcon: boolean = false;
  showSecondIcon: boolean = false;

  handleFilter(selection: string): Files[] {
    const today = new Date();
    const within7Days = new Date();
    const within30Days = new Date();
    const within90Days = new Date();
    within7Days.setDate(today.getDate() - 7);
    within30Days.setDate(today.getDate() - 30);
    within90Days.setDate(today.getDate() - 90);

    if (selection === 'all') {
      return (this.filteredData = this.dummyFileData);
    }

    if (selection === 'seven-days') {
      this.filteredData = this.dummyFileData.filter((file) => {
        return file.date <= today && file.date >= within7Days;
      });
    }
    if (selection === 'thirty-days') {
      this.filteredData = this.dummyFileData.filter((file) => {
        return file.date <= today && file.date >= within30Days;
      });
    }
    if (selection === 'ninety-days') {
      this.filteredData = this.dummyFileData.filter((file) => {
        return file.date <= today && file.date >= within90Days;
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
    console.log(selectedCB.length);
    file.selected = !file.selected;
    if (file.selected) {
      this.selectedFileName = file.fileName;
      this.selectedFileContent = file.content;
      this.isFileSelected = true;
    } else if (selectedCB.length > 1 && this.selectedFileName) {
      //if there are multiple checkboxes selected and you uncheck one, the selected file/content will default to first item in the array
      this.selectedFileName = selectedCB[0].fileName;
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
      this.dummyFileData.forEach((cb) => (cb.selected = true));
    } else this.dummyFileData.forEach((cb) => (cb.selected = false));
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
