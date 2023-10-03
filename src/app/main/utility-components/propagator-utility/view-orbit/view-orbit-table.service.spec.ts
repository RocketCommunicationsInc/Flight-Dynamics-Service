import { TestBed } from '@angular/core/testing';

import { ViewOrbitTableService } from './view-orbit-table.service';

describe('ViewOrbitTableService', () => {
  let service: ViewOrbitTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewOrbitTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
