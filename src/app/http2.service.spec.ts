import { TestBed } from '@angular/core/testing';

import { Http2Service } from './http2.service';

describe('Http2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Http2Service = TestBed.get(Http2Service);
    expect(service).toBeTruthy();
  });
});
