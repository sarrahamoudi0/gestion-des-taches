import { User } from "../../model/user";

export interface AuthState {
  user: User | null;
}

export const initialAuthState: AuthState = {
  user: null,
};
