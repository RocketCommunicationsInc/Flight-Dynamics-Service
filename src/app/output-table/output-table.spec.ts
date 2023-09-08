import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputTable } from './output-table';

describe('OutputTable', () => {
  let component: OutputTable;
  let fixture: ComponentFixture<OutputTable>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputTable],
    });
    fixture = TestBed.createComponent(OutputTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
