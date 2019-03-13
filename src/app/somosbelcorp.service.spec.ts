import { TestBed } from '@angular/core/testing';

import { SomosbelcorpService } from './somosbelcorp.service';

describe('SomosbelcorpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SomosbelcorpService = TestBed.get(SomosbelcorpService);
    expect(service).toBeTruthy();
  });
});
