import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from '@frontend/ui';
import { ForgotPasswordResult } from '../../../model/forgot-password-result';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'frontend-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  invalid: boolean;
  closeResult = {
    success: false,
  } as ForgotPasswordResult;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private authService: AuthService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      username: [this.data.username ?? '', Validators.required],
    });
  }

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.invalid = false;

    this.loaderService.show();

    this.authService
      .forgotPassword(this.formControls.username.value)
      .then((value) => {
        if (value.success && value.payload.CodeDeliveryDetails) {
          this.dialogRef.close({
            success: true,
            deliveryDetails: value.payload.CodeDeliveryDetails,
          } as ForgotPasswordResult);
        }
      })
      .catch(() => (this.invalid = true))
      .finally(() => this.loaderService.hide());
  }
}
