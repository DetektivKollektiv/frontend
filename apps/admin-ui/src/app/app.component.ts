import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

import {
  AuthService,
  ConfirmComponent,
  Globals,
  LoginDialogComponent,
  LoginResult,
  LoginResultReason,
} from '@frontend/auth';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FetchAllItems } from './store/items/items.actions';
import { LoaderService } from '@frontend/ui';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public stage = environment.stage;

  public links = [
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Items', link: '/items' },
  ];
  public loggedIn: boolean;

  private authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService,
    private store: Store
  ) {}

  logout(): void {
    if (!this.loggedIn) {
      return;
    }

    this.authService.signOut().then().catch().finally();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loader.show();

    this.authSubscription = this.authService.isLoggedIn$
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((isLoggedIn) => {
        this.loggedIn = isLoggedIn;

        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        } else {
          this.store
            .dispatch(new FetchAllItems())
            .subscribe(() => this.router.navigate(['/dashboard']));
        }
      });
  }
}
