import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectDataDisplayComponent } from './object-data-display.component';

describe('ObjectDataDisplayComponent', () => {
  let component: ObjectDataDisplayComponent;
  let fixture: ComponentFixture<ObjectDataDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectDataDisplayComponent]
    });
    fixture = TestBed.createComponent(ObjectDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
