import { TestBed, inject } from '@angular/core/testing';

import { BlockchainDataService } from './blockchain-data.service';

describe('BlockchainDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockchainDataService]
    });
  });

  it('should be created', inject([BlockchainDataService], (service: BlockchainDataService) => {
    expect(service).toBeTruthy();
  }));
});
