import { TestBed } from '@angular/core/testing';

import { OutputDataDisplayService } from './output-data-display.service';

describe('OutputDataDisplayService', () => {
  let service: OutputDataDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputDataDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
