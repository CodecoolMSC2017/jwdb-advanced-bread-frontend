import { TestBed, inject } from '@angular/core/testing';

import { BartenderService } from './bartender.service';

describe('BartenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BartenderService]
    });
  });

  it('should be created', inject([BartenderService], (service: BartenderService) => {
    expect(service).toBeTruthy();
  }));
});
