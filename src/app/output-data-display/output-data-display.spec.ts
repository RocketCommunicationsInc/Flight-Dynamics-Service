import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDataDisplay } from './output-data-display';

describe('OutputDataDisplay', () => {
  let component: OutputDataDisplay;
  let fixture: ComponentFixture<OutputDataDisplay>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputDataDisplay],
    });
    fixture = TestBed.createComponent(OutputDataDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
