// src/services/authService.ts
import { User } from "../models/user.model";
import { RefreshToken } from "../models/refresh-token.model";
import { TokenUtil } from "../utils/token.util";
import {
  IRegisterDto,
  ILoginDto,
  IAuthTokens,
  IUserDocument,
  IVerifyEmailDto,
  IResendVerificationDto,
} from "../types/auth.types";
import { HydratedDocument } from "mongoose";
import { EmailService } from "./emailService";
import { Country } from "../models/country.model";

export class AuthService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(
    dto: IRegisterDto
  ): Promise<{ tokens: IAuthTokens; message: string }> {
    // Şifre kontrolü
    if (dto.password !== dto.confirmPassword) {
      throw new Error("Şifreler eşleşmiyor");
    }

    const existingUser = await User.findOne({ email: dto.email });
    if (existingUser) {
      throw new Error("Bu email adresi zaten kullanılıyor");
    }

    // phoneCountryId'den phoneCountryCode'a dönüşüm
    const country = await Country.findOne({ id: dto.phoneCountryId });
    if (!country) {
      throw new Error("Geçersiz ülke kodu");
    }

    // Verification kodu oluştur
    const verificationCode = this.generateVerificationCode();
    const verificationExpires = new Date();
    verificationExpires.setMinutes(verificationExpires.getMinutes() + 15); // 15 dakika

    // confirmPassword ve phoneCountryId'yi çıkar, phoneCountryCode ekle
    const { confirmPassword, phoneCountryId, ...userData } = dto;

    const user = (await User.create({
      ...userData,
      phoneCountryCode: country.code, // +90, +1 gibi
      emailVerificationCode: verificationCode,
      emailVerificationExpires: verificationExpires,
    })) as HydratedDocument<IUserDocument>;

    // Email gönderimini asenkron yap - Bun için Promise kullan
    this.sendVerificationEmailAsync(
      user.email,
      user.firstName,
      verificationCode
    ).catch((error) => {
      console.error("❌ Email gönderilemedi:", error);
    });

    const tokens = TokenUtil.generateTokens(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      false
    ); // Register'da rememberMe yok, default false

    await this.saveRefreshToken(
      user._id.toString(),
      tokens.refreshToken,
      false
    );

    return {
      tokens,
      message: "Kayıt başarılı. Email adresinize gönderilen kodu doğrulayınız.",
    };
  }

  // Asenkron email gönderimi için yardımcı metod
  private async sendVerificationEmailAsync(
    email: string,
    firstName: string,
    verificationCode: string
  ): Promise<void> {
    // Bun için setTimeout kullan (0ms ile hemen sonraki event loop'ta çalışır)
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          await this.emailService.sendVerificationEmail(
            email,
            firstName,
            verificationCode
          );
          console.log(`✅ Doğrulama emaili gönderildi: ${email}`);
        } catch (error) {
          console.error("❌ Email gönderilemedi:", error);
        }
        resolve();
      }, 0);
    });
  }

  async verifyEmail(dto: IVerifyEmailDto): Promise<{ message: string }> {
    const user = await User.findOne({ email: dto.email });
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }

    if (user.isEmailVerified) {
      throw new Error("Email adresi zaten doğrulanmış");
    }

    if (!user.emailVerificationCode || !user.emailVerificationExpires) {
      throw new Error("Doğrulama kodu bulunamadı");
    }

    if (new Date() > user.emailVerificationExpires) {
      throw new Error("Doğrulama kodunun süresi dolmuş");
    }

    if (user.emailVerificationCode !== dto.code) {
      throw new Error("Geçersiz doğrulama kodu");
    }

    // Email'i doğrula
    user.isEmailVerified = true;
    user.emailVerificationCode = null;
    user.emailVerificationExpires = null;
    await user.save();

    return { message: "Email adresiniz başarıyla doğrulandı" };
  }

  async resendVerificationCode(
    dto: IResendVerificationDto
  ): Promise<{ message: string }> {
    const user = await User.findOne({ email: dto.email });
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }

    if (user.isEmailVerified) {
      throw new Error("Email adresi zaten doğrulanmış");
    }

    // Yeni kod oluştur
    const verificationCode = this.generateVerificationCode();
    const verificationExpires = new Date();
    verificationExpires.setMinutes(verificationExpires.getMinutes() + 15);

    user.emailVerificationCode = verificationCode;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    // Email gönderimini asenkron yap
    this.sendVerificationEmailAsync(
      user.email,
      user.firstName,
      verificationCode
    ).catch((error) => {
      console.error("❌ Email gönderilemedi:", error);
    });

    return { message: "Doğrulama kodu tekrar gönderildi" };
  }

  async login(dto: ILoginDto): Promise<IAuthTokens> {
    const user = (await User.findOne({ email: dto.email }).select(
      "+password"
    )) as HydratedDocument<IUserDocument> | null;

    if (!user) {
      throw new Error("Geçersiz email veya şifre");
    }

    const isPasswordValid = await user.comparePassword(dto.password);
    if (!isPasswordValid) {
      throw new Error("Geçersiz email veya şifre");
    }

    if (!user.isActive) {
      throw new Error("Hesabınız devre dışı");
    }

    if (!user.isEmailVerified) {
      throw new Error("Email adresinizi doğrulamanız gerekmektedir");
    }

    const rememberMe = dto.rememberMe || false;
    const tokens = TokenUtil.generateTokens(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      rememberMe
    );

    await this.saveRefreshToken(
      user._id.toString(),
      tokens.refreshToken,
      rememberMe
    );

    return tokens;
  }

  async refreshTokens(refreshToken: string): Promise<IAuthTokens> {
    const payload = TokenUtil.verifyRefreshToken(refreshToken);

    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
      userId: payload.userId,
    });

    if (!storedToken) {
      throw new Error("Invalid refresh token");
    }

    await RefreshToken.deleteOne({ _id: storedToken._id });

    const user = (await User.findById(
      payload.userId
    )) as HydratedDocument<IUserDocument> | null;
    if (!user || !user.isActive) {
      throw new Error("User not found or inactive");
    }

    // Yeni token oluştururken eski token'ın rememberMe durumunu koru
    const rememberMe =
      storedToken.expiresAt > new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

    const tokens = TokenUtil.generateTokens(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      rememberMe
    );

    await this.saveRefreshToken(
      user._id.toString(),
      tokens.refreshToken,
      rememberMe
    );

    return tokens;
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    await RefreshToken.deleteOne({ userId, token: refreshToken });
  }

  async logoutAll(userId: string): Promise<void> {
    await RefreshToken.deleteMany({ userId });
  }

  private async saveRefreshToken(
    userId: string,
    token: string,
    rememberMe: boolean = false
  ): Promise<void> {
    await RefreshToken.create({
      userId,
      token,
      expiresAt: TokenUtil.getRefreshTokenExpiry(rememberMe),
    });
  }
}
