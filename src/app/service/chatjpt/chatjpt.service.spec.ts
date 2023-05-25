import { TestBed } from '@angular/core/testing';

import { ChatjptService } from './chatjpt.service';

describe('ChatjptService', () => {
  let service: ChatjptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatjptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
