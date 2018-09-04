import { TestBed, inject } from '@angular/core/testing';

import { PaypalinvoiceService } from './paypalinvoice.service';

describe('PaypalinvoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaypalinvoiceService]
    });
  });

  it('should be created', inject([PaypalinvoiceService], (service: PaypalinvoiceService) => {
    expect(service).toBeTruthy();
  }));
});
