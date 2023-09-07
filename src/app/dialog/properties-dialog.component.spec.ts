import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesDialogComponent } from './properties-dialog.component';

describe('DialogComponent', () => {
  let component: PropertiesDialogComponent;
  let fixture: ComponentFixture<PropertiesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesDialogComponent],
    });
    fixture = TestBed.createComponent(PropertiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
