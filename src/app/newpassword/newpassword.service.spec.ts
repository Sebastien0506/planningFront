import { TestBed } from '@angular/core/testing';

import { NewpasswordService } from './newpassword.service';

describe('NewpasswordService', () => {
  let service: NewpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
