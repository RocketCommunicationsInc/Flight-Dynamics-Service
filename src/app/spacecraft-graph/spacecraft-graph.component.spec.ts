import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacecraftGraphComponent } from './spacecraft-graph.component';

describe('SpacecraftGraphComponent', () => {
  let component: SpacecraftGraphComponent;
  let fixture: ComponentFixture<SpacecraftGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpacecraftGraphComponent]
    });
    fixture = TestBed.createComponent(SpacecraftGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
