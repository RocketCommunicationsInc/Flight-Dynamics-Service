import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInputsOutputs } from './data-inputs-outputs';

describe('DataInputsOutputs', () => {
  let component: DataInputsOutputs;
  let fixture: ComponentFixture<DataInputsOutputs>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataInputsOutputs],
    });
    fixture = TestBed.createComponent(DataInputsOutputs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
