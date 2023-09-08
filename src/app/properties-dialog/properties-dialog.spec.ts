import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesDialog } from './properties-dialog';

describe('PropertiesDialog', () => {
  let component: PropertiesDialog;
  let fixture: ComponentFixture<PropertiesDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesDialog],
    });
    fixture = TestBed.createComponent(PropertiesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
