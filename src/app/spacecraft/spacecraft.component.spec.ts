import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacecraftComponent } from './spacecraft.component';

describe('SpacecraftComponent', () => {
  let component: SpacecraftComponent;
  let fixture: ComponentFixture<SpacecraftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpacecraftComponent]
    });
    fixture = TestBed.createComponent(SpacecraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
