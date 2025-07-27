import { User } from "../models/User";
import { ReduxState } from "./ReduxState";

export interface ProfileState extends ReduxState {
  user: User | null;
}
