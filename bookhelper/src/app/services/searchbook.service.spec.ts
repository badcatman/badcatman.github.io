import { TestBed, inject } from '@angular/core/testing';

import { SearchbookService } from './searchbook.service';

describe('SearchbookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchbookService]
    });
  });

  it('should be created', inject([SearchbookService], (service: SearchbookService) => {
    expect(service).toBeTruthy();
  }));
});
