import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrackFilesComponent } from './search-track-files.component';

describe('SearchTrackFilesComponent', () => {
  let component: SearchTrackFilesComponent;
  let fixture: ComponentFixture<SearchTrackFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchTrackFilesComponent]
    });
    fixture = TestBed.createComponent(SearchTrackFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
