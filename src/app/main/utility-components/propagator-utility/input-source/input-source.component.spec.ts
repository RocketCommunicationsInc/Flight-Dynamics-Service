import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSourceComponent } from './input-source.component';

describe('InputSourceComponent', () => {
  let component: InputSourceComponent;
  let fixture: ComponentFixture<InputSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputSourceComponent]
    });
    fixture = TestBed.createComponent(InputSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
