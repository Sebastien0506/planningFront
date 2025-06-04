import { TestBed } from '@angular/core/testing';

import { AddShopService } from './add-shop.service';

describe('AddShopService', () => {
  let service: AddShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
