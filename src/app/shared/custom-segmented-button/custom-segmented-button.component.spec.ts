import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSegmentedButtonComponent } from './custom-segmented-button.component';

describe('CustomSegmentedButtonComponent', () => {
  let component: CustomSegmentedButtonComponent;
  let fixture: ComponentFixture<CustomSegmentedButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomSegmentedButtonComponent],
    });
    fixture = TestBed.createComponent(CustomSegmentedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
