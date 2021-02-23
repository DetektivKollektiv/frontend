import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { ForgotPasswordComponent } from './dialogs/forgot-password/forgot-password.component';
import { ForgotPasswordSubmitComponent } from './dialogs/forgot-password-submit/forgot-password-submit.component';
import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import { SignupComponent } from './dialogs/signup/signup.component';

import { UiModule } from '@frontend/ui';

@NgModule({
  declarations: [
    ConfirmComponent,
    ForgotPasswordComponent,
    ForgotPasswordSubmitComponent,
    LoginDialogComponent,
    SignupComponent,
  ],
  imports: [CommonModule, UiModule],
  exports: [
    ConfirmComponent,
    ForgotPasswordComponent,
    ForgotPasswordSubmitComponent,
    LoginDialogComponent,
    SignupComponent,
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthGuard, AuthService],
    };
  }
}
