import { ApiResponse } from "./Api";

export interface Auth {
  accessToken: string;
  refreshToken: string;
  maxAge: number;
}

export type AuthResponse = ApiResponse<Auth>;
