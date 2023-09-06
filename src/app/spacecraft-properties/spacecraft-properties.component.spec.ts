import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacecraftPropertiesComponent } from './spacecraft-properties.component';

describe('SpacecraftPropertiesComponent', () => {
  let component: SpacecraftPropertiesComponent;
  let fixture: ComponentFixture<SpacecraftPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpacecraftPropertiesComponent]
    });
    fixture = TestBed.createComponent(SpacecraftPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
