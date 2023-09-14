import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsOutputsComponent } from './inputs-outputs.component';

describe('InputsOutputsComponent', () => {
  let component: InputsOutputsComponent;
  let fixture: ComponentFixture<InputsOutputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputsOutputsComponent]
    });
    fixture = TestBed.createComponent(InputsOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
