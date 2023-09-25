import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModelComponent } from './view-model.component';

describe('ViewModelComponent', () => {
  let component: ViewModelComponent;
  let fixture: ComponentFixture<ViewModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ViewModelComponent]
    });
    fixture = TestBed.createComponent(ViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
