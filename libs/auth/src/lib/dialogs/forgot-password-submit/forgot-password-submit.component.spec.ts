import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordSubmitComponent } from './forgot-password-submit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UiModule } from '@frontend/ui';
import { AuthService } from '../../service/auth.service';
import { MockAuthService } from '../../../test/mock/mock-auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ForgotPasswordSubmitComponent', () => {
  let component: ForgotPasswordSubmitComponent;
  let fixture: ComponentFixture<ForgotPasswordSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule.forRoot(), NoopAnimationsModule],
      declarations: [ForgotPasswordSubmitComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            details: {
              DeliveryMedium: 'SMS',
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
