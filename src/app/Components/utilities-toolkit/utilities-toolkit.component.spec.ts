import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitiesToolkitComponent } from './utilities-toolkit.component';

describe('UtilitiesToolkitComponent', () => {
  let component: UtilitiesToolkitComponent;
  let fixture: ComponentFixture<UtilitiesToolkitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilitiesToolkitComponent]
    });
    fixture = TestBed.createComponent(UtilitiesToolkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
