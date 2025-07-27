// src/types/auth.types.ts
import { Document, Types } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneCountryCode: string;
  isActive: boolean;
  isEmailVerified: boolean;
  emailVerificationCode?: string | null;
  emailVerificationExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneCountryCode: string;
  isActive: boolean;
  isEmailVerified: boolean;
  emailVerificationCode?: string | null;
  emailVerificationExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ITokenPayload {
  userId: string;
  email: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  maxAge: number; // saniye cinsinden
}

export interface IRegisterDto {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneCountryId: number; // phoneCountryCode yerine phoneCountryId
}

export interface ILoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IVerifyEmailDto {
  email: string;
  code: string;
}

export interface IResendVerificationDto {
  email: string;
}
