import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { ForgotPasswordComponent } from './dialogs/forgot-password/forgot-password.component';
import { ForgotPasswordSubmitComponent } from './dialogs/forgot-password-submit/forgot-password-submit.component';
import { LoginComponent } from './dialogs/login/login.component';
import { SignupComponent } from './dialogs/signup/signup.component';

import { UiModule } from '@frontend/ui';

@NgModule({
  declarations: [
    ConfirmComponent,
    ForgotPasswordComponent,
    ForgotPasswordSubmitComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [CommonModule, UiModule],
  exports: [
    ConfirmComponent,
    ForgotPasswordComponent,
    ForgotPasswordSubmitComponent,
    LoginComponent,
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
