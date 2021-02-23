import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

import { AuthState, Logout } from '@frontend/auth';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { FetchAllItems } from './store/items/items.actions';
import { LoaderService } from '@frontend/ui';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(AuthState.loggedIn) loggedIn$: Observable<boolean>;

  public stage = environment.stage;

  public links = [
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Items', link: '/items' },
  ];
  public loggedIn: boolean;

  private authSubscription: Subscription;

  constructor(
    private router: Router,
    private loader: LoaderService,
    private store: Store
  ) {}

  logout(): void {
    if (!this.loggedIn) {
      return;
    }

    this.store.dispatch(new Logout());
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loader.show();

    this.authSubscription = this.loggedIn$
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((loggedIn: boolean) => {
        this.loggedIn = loggedIn;
        if (!loggedIn) {
          this.router.navigate(['/login']);
        } else {
          this.store
            .dispatch(new FetchAllItems())
            .subscribe(() => this.router.navigate(['/dashboard']));
        }
      });
  }
}
