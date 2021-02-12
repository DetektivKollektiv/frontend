import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Auth } from 'aws-amplify';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../dialogs/login/login.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch (e) {
      const snackBar = this.snackBar.open('', 'Login', {
        duration: 2000,
      });

      snackBar.onAction().subscribe(() => this.dialog.open(LoginComponent));
      snackBar.afterDismissed().subscribe(() => this.router.navigate(['/']));
      return false;
    }
  }
}
