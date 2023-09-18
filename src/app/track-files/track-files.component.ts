import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { dummyFileData } from './dummy-file-data';
import { FormsModule } from '@angular/forms';
import { Files } from '../types/Files';

type Sort = 'ASC' | 'DESC' | ''
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

  randomDate(start: { getTime: () => number }, end: { getTime: () => number }) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  filteredData: Files[] = this.dummyFileData;

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

  filteredFiles: Files[] = [];

  onSelect(event: any) {
    this.filteredFiles = this.handleFilter(event.target.value);
  }

  sortDirection: Sort = 'ASC';
  sortedColumn: string = '';

  sortColumn(column: string) {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'ASC';
    }
    this.filteredData.sort((a: any, b: any) => {
      console.log(this.sortDirection);
      return this.sortDirection === 'ASC'
        ? a[this.sortedColumn].localeCompare(b[this.sortedColumn])
        : b[this.sortedColumn].localeCompare(a[this.sortedColumn]);
    });
  }

  handleCheckbox(file: any): void {
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
