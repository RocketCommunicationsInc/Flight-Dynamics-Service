import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDataDisplayComponent } from './output-data-display.component';

describe('OutputDataDisplayComponent', () => {
  let component: OutputDataDisplayComponent;
  let fixture: ComponentFixture<OutputDataDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OutputDataDisplayComponent],
    });
    fixture = TestBed.createComponent(OutputDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
