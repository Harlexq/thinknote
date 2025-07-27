// src/utils/token.util.ts
import jwt from "jsonwebtoken";
import { ITokenPayload, IAuthTokens } from "../types/auth.types";

export class TokenUtil {
  private static readonly ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
  private static readonly REFRESH_TOKEN_SECRET =
    process.env.JWT_REFRESH_SECRET!;
  private static readonly ACCESS_TOKEN_EXPIRY = "15m";
  private static readonly REFRESH_TOKEN_EXPIRY_DEFAULT = "7d";
  private static readonly REFRESH_TOKEN_EXPIRY_REMEMBER = "30d";
  private static readonly REFRESH_TOKEN_SECONDS_DEFAULT = 7 * 24 * 60 * 60; // 7 gün
  private static readonly REFRESH_TOKEN_SECONDS_REMEMBER = 30 * 24 * 60 * 60; // 30 gün

  static generateTokens(
    payload: ITokenPayload,
    rememberMe: boolean = false
  ): IAuthTokens {
    const accessToken = jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY,
    });

    const refreshTokenExpiry = rememberMe
      ? this.REFRESH_TOKEN_EXPIRY_REMEMBER
      : this.REFRESH_TOKEN_EXPIRY_DEFAULT;

    const refreshToken = jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {
      expiresIn: refreshTokenExpiry,
    });

    const maxAge = rememberMe
      ? this.REFRESH_TOKEN_SECONDS_REMEMBER
      : this.REFRESH_TOKEN_SECONDS_DEFAULT;

    return { accessToken, refreshToken, maxAge };
  }

  static verifyAccessToken(token: string): ITokenPayload {
    return jwt.verify(token, this.ACCESS_TOKEN_SECRET) as ITokenPayload;
  }

  static verifyRefreshToken(token: string): ITokenPayload {
    return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as ITokenPayload;
  }

  static getRefreshTokenExpiry(rememberMe: boolean = false): Date {
    const days = rememberMe ? 30 : 7;
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
}
