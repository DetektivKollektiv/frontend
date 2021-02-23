import { Inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { a } from 'aws-amplify';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../lib/service/auth.service';
import { Login, Logout } from './auth.actions';

export class AuthStateModel {
  public username?: string;
  public loggedIn: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
})
@Injectable()
export class AuthState {
  @Selector()
  static username(state: AuthStateModel): string | null {
    return state.username;
  }

  @Selector()
  static loggedIn(state: AuthStateModel): boolean | null {
    return state.loggedIn;
  }

  constructor(private authService: AuthService) {}

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, action: Login) {
    return from(this.authService.signIn(action.username, action.password)).pipe(
      tap(() => patchState({ username: action.username, loggedIn: true }))
    );
  }

  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>) {
    return from(this.authService.signOut()).pipe(
      tap(() => setState({ loggedIn: false }))
    );
  }
}
