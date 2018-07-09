import { TestBed, inject } from '@angular/core/testing';

import { AdoptionrequestService } from './adoptionrequest.service';

describe('AdoptionrequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdoptionrequestService]
    });
  });

  it('should be created', inject([AdoptionrequestService], (service: AdoptionrequestService) => {
    expect(service).toBeTruthy();
  }));
});
