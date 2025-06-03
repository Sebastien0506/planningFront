import { TestBed } from '@angular/core/testing';

import { ModifyShopService } from './modify-shop.service';

describe('ModifyShopService', () => {
  let service: ModifyShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifyShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
