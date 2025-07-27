import { ReduxState } from "./ReduxState";

export interface AuthState extends ReduxState {
  isAuth: boolean;
}
