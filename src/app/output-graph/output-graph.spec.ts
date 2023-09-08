import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputGraph } from './output-graph';

describe('OutputGraph', () => {
  let component: OutputGraph;
  let fixture: ComponentFixture<OutputGraph>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputGraph],
    });
    fixture = TestBed.createComponent(OutputGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
