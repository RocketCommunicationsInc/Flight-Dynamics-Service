import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareUtilityComponent } from './compare-utility.component';

describe('CompareUtilityComponent', () => {
  let component: CompareUtilityComponent;
  let fixture: ComponentFixture<CompareUtilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompareUtilityComponent]
    });
    fixture = TestBed.createComponent(CompareUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
