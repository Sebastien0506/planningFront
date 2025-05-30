import { TestBed } from '@angular/core/testing';

import { AddEmployeService } from './add-employe.service';

describe('AddEmployeService', () => {
  let service: AddEmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
