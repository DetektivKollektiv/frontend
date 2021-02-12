import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ForgotPasswordSubmitComponent } from '../forgot-password-submit/forgot-password-submit.component';
import { LoginResult, LoginResultReason } from '../../../model/login-result';
import { AuthService } from '../../service/auth.service';
import { ConfirmResult } from '../../../model/confirm-result';
import { LoaderService } from '@frontend/ui';
import { OperationResult } from '@frontend/data';
import { ForgotPasswordResult } from '../../../model/forgot-password-result';
import { Globals } from '../../../helper/globals';

@Component({
  selector: 'frontend-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginInvalid: boolean;
  closeResult = {
    success: true,
    reason: LoginResultReason.Cancelled,
  } as LoginResult;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private loaderService: LoaderService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.dialogRef.disableClose = true;
  }

  get formControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loaderService.show();

    this.loginInvalid = false;

    this.authService
      .signIn(
        this.formControls.username.value,
        this.formControls.password.value
      )
      .then(() => {
        this.dialogRef.close({
          success: true,
          reason: LoginResultReason.LoginSuccessful,
        } as LoginResult);
      })
      .catch((reason: OperationResult<any>) => {
        if (reason.payload?.code === 'UserNotConfirmedException') {
          this.confirm();
        }

        this.loginInvalid = true;
      })
      .finally(() => this.loaderService.hide());
  }

  forgotPassword() {
    this.dialog
      .open(ForgotPasswordComponent, {
        ...Globals.dialogData,
        ...{ data: { username: this.formControls.username.value } },
      })
      .afterClosed()
      .subscribe((value: ForgotPasswordResult) => {
        if (value.success) {
          this.dialog.open(ForgotPasswordSubmitComponent, {
            ...Globals.dialogData,
            ...{
              data: {
                username: this.formControls.username.value,
                details: value.deliveryDetails,
              },
            },
          });
        }
      });
  }

  close() {
    this.dialogRef.close();
  }

  private confirm() {
    this.dialog
      .open(ConfirmComponent, {
        ...Globals.dialogData,
        ...{ data: { username: this.formControls.username.value } },
      })
      .afterClosed()
      .subscribe((result: ConfirmResult) => {
        if (result.success) {
          this.onLoginSubmit();
        }
      });
  }
}
