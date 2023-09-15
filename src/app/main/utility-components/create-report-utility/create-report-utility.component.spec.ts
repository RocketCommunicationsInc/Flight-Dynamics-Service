import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReportUtilityComponent } from './create-report-utility.component';

describe('CreateReportUtilityComponent', () => {
  let component: CreateReportUtilityComponent;
  let fixture: ComponentFixture<CreateReportUtilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateReportUtilityComponent],
    });
    fixture = TestBed.createComponent(CreateReportUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
