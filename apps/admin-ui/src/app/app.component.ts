import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

import {
  AuthService,
  ConfirmComponent,
  Globals,
  LoginComponent,
  LoginResult,
  LoginResultReason,
} from '@frontend/auth';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public stage = environment.stage;

  public links = [
    { text: 'Dashboard', link: '' },
    { text: 'Items', link: '/items' },
  ];
  public loggedIn: boolean;

  private authSubscription: Subscription;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  login(): void {
    if (this.loggedIn) {
      return;
    }

    this.dialog
      .open(LoginComponent, Globals.dialogData)
      .afterClosed()
      .subscribe((result: LoginResult) => {
        if (result.success) {
          return;
        }

        switch (result.reason) {
          case LoginResultReason.LoginSuccessful:
            break;
          case LoginResultReason.ConfirmationMissing:
            this.dialog.open(ConfirmComponent, {
              ...Globals.dialogData,
              ...{ data: { username: result.username } },
            });
            break;
          case LoginResultReason.Cancelled:
            break;
          default:
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.loggedIn = isLoggedIn;
      }
    );
  }
}
