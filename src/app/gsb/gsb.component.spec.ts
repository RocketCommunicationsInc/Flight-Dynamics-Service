import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsbComponent } from './gsb.component';

describe('GsbComponent', () => {
  let component: GsbComponent;
  let fixture: ComponentFixture<GsbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GsbComponent]
    });
    fixture = TestBed.createComponent(GsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
