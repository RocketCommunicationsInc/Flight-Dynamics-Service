import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputsComponent } from './outputs.component';

describe('OutputsComponent', () => {
  let component: OutputsComponent;
  let fixture: ComponentFixture<OutputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OutputsComponent]
    });
    fixture = TestBed.createComponent(OutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
