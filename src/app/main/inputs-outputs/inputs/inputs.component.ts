import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppStore } from 'src/app/+state/app.model';
import { Store } from '@ngrx/store';
import {
  selectAllTrackFiles,
  selectCurrentSpacecraft,
} from 'src/app/+state/app.selectors';
import { TrackFile } from 'src/app/types/data.types';
@Component({
  selector: 'fds-inputs',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, ReactiveFormsModule],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
})
export class InputsComponent implements AfterViewInit {
  inputForm = new FormGroup({
    databaseFile: new FormControl(''),
    orbitSource: new FormControl(''),
    thrustProfile: new FormControl(''),
    processedTrackFile: new FormControl(''),
  });
  notificationActive = true;

  onSubmit(): void {
    console.log(this.inputForm.value);
    //TODO hook form data into where it's going to go
  }

  // @ViewChild('popup', { static: false }) popup?: ElementRef;
  // @ViewChild('dbInput', { static: false }) dbInput?: ElementRef;

  ngAfterViewInit(): void {
    //   this.popup?.nativeElement.addEventListener('ruxpopupclosed', () => {
    //     if (document.activeElement === this.dbInput?.nativeElement) {
    //       this.popup?.nativeElement.show();
    //     }
    //   });
  }

  trackFiles$ = this.store.select(selectAllTrackFiles);
  scenario$ = this.store.select(selectCurrentSpacecraft);
  currentScenarioTrackFiles: TrackFile[] = [];

  constructor(private store: Store<AppStore>) {
    this.scenario$.subscribe((scenario) => {
      this.trackFiles$.subscribe((trackFile) => {
        if (scenario) {
          scenario.trackFileIds.forEach((id) => {
            trackFile.map((file) => {
              if (file.id.includes(id)) {
                this.currentScenarioTrackFiles.push(file);
              }
            });
          });
        }
      });
    });
  }

  hasValue: boolean = false;
  results: any[] = [];
  noResults: boolean = false;
  isDisabled: boolean = true;
  latestTrackFile: any = {};
  noLatestTrackFile: boolean = true;

  databaseFile: string = '';
  orbitSourceFile: string = '';
  thrustProfileFile: string = '';
  processedTrackFile: string = '';
  openPopup: boolean = false;

  handleInput(event: any) {
    this.results = [];
    if (event.target.value === '') {
      this.databaseFile = '';
      this.orbitSourceFile = '';
      this.thrustProfileFile = '';
      this.processedTrackFile = '';
      this.openPopup = true;
    }
    if (event.target.value !== '') {
      // this.dbInput?.nativeElement.setFocus();
      // console.log(this.dbInput?.nativeElement);
      this.openPopup = true;
      this.hasValue = true;
      this.currentScenarioTrackFiles.filter((file) => {
        if (file.name.includes(event.target.value)) {
          this.results.push(file);
        } else this.noResults = true;
      });
    } else {
      this.hasValue = false;
      this.isDisabled = true;
    }
  }

  // handleFocus(event: any) {
  //   console.log(event.target, 'eventttt');
  //   if (event.target.value !== '') {
  //     this.hasValue = true;
  //     this.currentScenarioTrackFiles.filter((file) => {
  //       if (!file.name.includes(event.target.value)) {
  //         this.noResults = true;
  //       }
  //     });
  //   }
  // }

  showPopup() {
    // console.log(this.popup)
    // this.popup?.nativeElement.show()
  }

  handleSelection(event: any) {
    this.currentScenarioTrackFiles.map((file) => {
      if (file.id.includes(event.detail.value)) {
        this.latestTrackFile = file;
        this.isDisabled = false;
        this.noLatestTrackFile = false;
        this.databaseFile = file.name;
        this.orbitSourceFile = file.tleSourceFile.name;
        this.thrustProfileFile = file.thrustProfileFileName;
        this.processedTrackFile = file.processedTrackFile?.name as string;
      }
    });
  }
}
