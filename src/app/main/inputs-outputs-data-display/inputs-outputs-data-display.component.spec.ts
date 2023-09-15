import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsOutputsDataDisplayComponent } from './inputs-outputs-data-display.component';

describe('InputsOutputsDataDisplayComponent', () => {
  let component: InputsOutputsDataDisplayComponent;
  let fixture: ComponentFixture<InputsOutputsDataDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputsOutputsDataDisplayComponent]
    });
    fixture = TestBed.createComponent(InputsOutputsDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
