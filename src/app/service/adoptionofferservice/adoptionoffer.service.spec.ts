import { TestBed, inject } from '@angular/core/testing';

import { AdoptionofferService } from './adoptionoffer.service';

describe('AdoptionofferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdoptionofferService]
    });
  });

  it('should be created', inject([AdoptionofferService], (service: AdoptionofferService) => {
    expect(service).toBeTruthy();
  }));
});
