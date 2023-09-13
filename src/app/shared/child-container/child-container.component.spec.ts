import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildContainerComponent } from './child-container.component';

describe('ChildContainerComponent', () => {
  let component: ChildContainerComponent;
  let fixture: ComponentFixture<ChildContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChildContainerComponent]
    });
    fixture = TestBed.createComponent(ChildContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
