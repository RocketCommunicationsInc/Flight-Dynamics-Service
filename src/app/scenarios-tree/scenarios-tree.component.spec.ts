import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariosTreeComponent } from './scenarios-tree.component';

describe('ScenariosTreeComponent', () => {
  let component: ScenariosTreeComponent;
  let fixture: ComponentFixture<ScenariosTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScenariosTreeComponent]
    });
    fixture = TestBed.createComponent(ScenariosTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
