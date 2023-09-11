import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInputsOutputsComponent } from './data-inputs-outputs.component';

describe('DataInputsOutputsComponent', () => {
  let component: DataInputsOutputsComponent;
  let fixture: ComponentFixture<DataInputsOutputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataInputsOutputsComponent],
    });
    fixture = TestBed.createComponent(DataInputsOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
