import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validSpacecraftGuard } from './valid-spacecraft.guard';

describe('validSpacecraftGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      validSpacecraftGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
