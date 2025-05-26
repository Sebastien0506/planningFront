import { TestBed } from '@angular/core/testing';

import { DetailEmployerService } from './detail-employer.service';

describe('DetailEmployerService', () => {
  let service: DetailEmployerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailEmployerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
