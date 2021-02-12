import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PLATFORM_ID } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@frontend/ui';
import { AuthService } from '../service/auth.service';
import { MockAuthService } from '../../test/mock/mock-auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, RouterTestingModule, UiModule.forRoot()],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
