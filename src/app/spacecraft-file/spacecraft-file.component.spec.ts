import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacecraftFileComponent } from './spacecraft-file.component';

describe('SpacecraftFileComponent', () => {
  let component: SpacecraftFileComponent;
  let fixture: ComponentFixture<SpacecraftFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpacecraftFileComponent]
    });
    fixture = TestBed.createComponent(SpacecraftFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
