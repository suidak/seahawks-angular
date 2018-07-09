import { TestBed, inject } from '@angular/core/testing';

import { AnimalphotoserviceService } from './animalphotoservice.service';

describe('AnimalphotoserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimalphotoserviceService]
    });
  });

  it('should be created', inject([AnimalphotoserviceService], (service: AnimalphotoserviceService) => {
    expect(service).toBeTruthy();
  }));
});
