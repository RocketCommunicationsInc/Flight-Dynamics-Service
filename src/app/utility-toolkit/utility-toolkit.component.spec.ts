import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityToolkitComponent } from './utility-toolkit.component';

describe('UtilityToolkitComponent', () => {
  let component: UtilityToolkitComponent;
  let fixture: ComponentFixture<UtilityToolkitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilityToolkitComponent],
    });
    fixture = TestBed.createComponent(UtilityToolkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
