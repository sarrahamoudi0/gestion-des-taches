import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user';
export const login = createAction('[Auth] Login', props<{ email: string }>());
export const logout = createAction('[Auth] Logout');
