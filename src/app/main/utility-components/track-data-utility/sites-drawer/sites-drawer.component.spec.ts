import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesDrawerComponent } from './sites-drawer.component';

describe('SitesDrawerComponent', () => {
  let component: SitesDrawerComponent;
  let fixture: ComponentFixture<SitesDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SitesDrawerComponent]
    });
    fixture = TestBed.createComponent(SitesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
