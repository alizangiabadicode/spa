/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginauthService } from './loginauth.service';

describe('Service: Loginauth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginauthService]
    });
  });

  it('should ...', inject([LoginauthService], (service: LoginauthService) => {
    expect(service).toBeTruthy();
  }));
});
