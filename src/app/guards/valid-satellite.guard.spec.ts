import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validSatelliteGuard } from './valid-satellite.guard';

describe('validSatelliteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validSatelliteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
