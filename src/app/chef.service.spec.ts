import { TestBed, inject } from '@angular/core/testing';

import { ChefService } from './chef.service';

describe('ChefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChefService]
    });
  });

  it('should be created', inject([ChefService], (service: ChefService) => {
    expect(service).toBeTruthy();
  }));
});
