import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrbitComponent } from './view-orbit.component';

describe('ViewOrbitComponent', () => {
  let component: ViewOrbitComponent;
  let fixture: ComponentFixture<ViewOrbitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ViewOrbitComponent],
    });
    fixture = TestBed.createComponent(ViewOrbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
