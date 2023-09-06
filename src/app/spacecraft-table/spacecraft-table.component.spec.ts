import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacecraftTableComponent } from './spacecraft-table.component';

describe('SpacecraftTableComponent', () => {
  let component: SpacecraftTableComponent;
  let fixture: ComponentFixture<SpacecraftTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpacecraftTableComponent]
    });
    fixture = TestBed.createComponent(SpacecraftTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
