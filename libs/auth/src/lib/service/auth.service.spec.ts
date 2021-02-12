import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Auth } from 'aws-amplify';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    Auth.configure({
      aws_project_region: 'eu-central-1',
      aws_cognito_identity_pool_id:
        'eu-central-1:69722fe9-a444-4aa5-8016-129a273b2fa5',
      aws_cognito_region: 'eu-central-1',
      aws_user_pools_id: 'eu-central-1_edLkAIQVL',
      aws_user_pools_web_client_id: '5hve4k55kh15k3eitap91h966r',
      federationTarget: 'COGNITO_USER_POOLS',
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
