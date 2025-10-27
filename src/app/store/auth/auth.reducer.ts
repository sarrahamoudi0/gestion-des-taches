import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { login, logout } from './auth.action';

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state, { email }) => ({ ...state, user: { email } })),
  on(logout, (state) => ({ ...state, user: null }))
);
