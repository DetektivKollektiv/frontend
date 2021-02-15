import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch (e) {
      const snackBar = this.snackBar.open('', 'Login', {
        duration: 2000,
      });

      snackBar
        .onAction()
        .subscribe(() => this.dialog.open(LoginDialogComponent));
      snackBar.afterDismissed().subscribe(() => this.router.navigate(['/']));
      return false;
    }
  }
}
