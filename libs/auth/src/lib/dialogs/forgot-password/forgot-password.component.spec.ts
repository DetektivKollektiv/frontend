import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UiModule } from '@frontend/ui';
import { AuthService } from '../../service/auth.service';
import { MockAuthService } from '../../../test/mock/mock-auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule.forRoot(), NoopAnimationsModule],
      declarations: [ForgotPasswordComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
