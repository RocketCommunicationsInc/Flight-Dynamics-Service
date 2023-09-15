import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedChildContainerComponent } from './tabbed-child-container.component';

describe('TabbedChildContainerComponent', () => {
  let component: TabbedChildContainerComponent;
  let fixture: ComponentFixture<TabbedChildContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TabbedChildContainerComponent]
    });
    fixture = TestBed.createComponent(TabbedChildContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
