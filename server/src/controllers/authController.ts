import { Elysia } from "elysia";
import { AuthService } from "../services/authService";
import { authMiddleware } from "../middlewares/authMiddleware";
import { HydratedDocument } from "mongoose";
import { IUserDocument } from "../types/auth.types";
import { authValidations } from "../validations/auth.validations";
import { authDocs } from "../swagger/schemas/auth.schemas";
import { ApiResponse } from "../utils/response.utils";

const authService = new AuthService();

type AuthContext = {
  user: HydratedDocument<IUserDocument>;
};

export const authController = new Elysia({ prefix: "/auth" })
  .post(
    "/register",
    async ({ body, set }) => {
      try {
        const result = await authService.register(body);
        set.status = 201;
        return ApiResponse.success(result.tokens, result.message);
      } catch (error: any) {
        set.status = 400;
        return ApiResponse.error(error.message);
      }
    },
    {
      body: authValidations.register,
      detail: authDocs.register,
      error: ({ code, error, set }) => {
        if (code === "VALIDATION") {
          set.status = 400;
          return ApiResponse.error("Validasyon hatası");
        }
        set.status = 400;
        const errorMessage =
          error && typeof error === "object" && "message" in error
            ? (error as Error).message
            : "Kayıt işlemi başarısız";
        return ApiResponse.error(errorMessage);
      },
    }
  )
  .post(
    "/verify-email",
    async ({ body, set }) => {
      try {
        const result = await authService.verifyEmail(body);
        return ApiResponse.success(null, result.message);
      } catch (error: any) {
        set.status = 400;
        return ApiResponse.error(error.message);
      }
    },
    {
      body: authValidations.verifyEmail,
      detail: authDocs.verifyEmail,
      error: ({ code, set }) => {
        if (code === "VALIDATION") {
          set.status = 400;
          return ApiResponse.error("Validasyon hatası");
        }
        set.status = 400;
        return ApiResponse.error("Email doğrulama başarısız");
      },
    }
  )
  .post(
    "/resend-verification",
    async ({ body, set }) => {
      try {
        const result = await authService.resendVerificationCode(body);
        return ApiResponse.success(null, result.message);
      } catch (error: any) {
        set.status = 400;
        return ApiResponse.error(error.message);
      }
    },
    {
      body: authValidations.resendVerification,
      detail: authDocs.resendVerification,
      error: ({ code, set }) => {
        if (code === "VALIDATION") {
          set.status = 400;
          return ApiResponse.error("Validasyon hatası");
        }
        set.status = 400;
        return ApiResponse.error("Doğrulama kodu gönderilemedi");
      },
    }
  )
  .post(
    "/login",
    async ({ body, set }) => {
      try {
        const tokens = await authService.login(body);
        return ApiResponse.success(tokens, "Giriş başarılı.");
      } catch (error: any) {
        set.status = 401;
        return ApiResponse.error(error.message);
      }
    },
    {
      body: authValidations.login,
      detail: authDocs.login,
      error: ({ code, set }) => {
        if (code === "VALIDATION") {
          set.status = 400;
          return ApiResponse.error("Validasyon hatası");
        }
        set.status = 401;
        return ApiResponse.error("Giriş başarısız");
      },
    }
  )
  .post(
    "/refresh",
    async ({ body, set }) => {
      try {
        const tokens = await authService.refreshTokens(body.refreshToken);
        return ApiResponse.success(tokens, "Token yenileme başarılı.");
      } catch (error: any) {
        set.status = 401;
        return ApiResponse.error(error.message);
      }
    },
    {
      body: authValidations.refresh,
      detail: authDocs.refresh,
      error: ({ code, set }) => {
        if (code === "VALIDATION") {
          set.status = 400;
          return ApiResponse.error("Validasyon hatası");
        }
        set.status = 401;
        return ApiResponse.error("Token yenileme başarısız");
      },
    }
  )
  .use(authMiddleware)
  .post(
    "/logout",
    async (context) => {
      const { body, set, user } = context as typeof context & AuthContext;
      try {
        await authService.logout(user._id.toString(), body.refreshToken);
        return ApiResponse.success(null, "Çıkış işlemi başarılı.");
      } catch (error: any) {
        set.status = 400;
        return ApiResponse.error(error.message);
      }
    },
    {
      body: authValidations.logout,
      detail: authDocs.logout,
      error: ({ code, set }) => {
        if (code === "VALIDATION") {
          set.status = 400;
          return ApiResponse.error("Validasyon hatası");
        }
        set.status = 400;
        return ApiResponse.error("Çıkış işlemi başarısız");
      },
    }
  )
  .post(
    "/logout-all",
    async (context) => {
      const { user } = context as typeof context & AuthContext;
      try {
        await authService.logoutAll(user._id.toString());
        return ApiResponse.success(null, "Tüm cihazlardan çıkış yapıldı.");
      } catch (error: any) {
        return ApiResponse.error(error.message);
      }
    },
    {
      detail: authDocs.logoutAll,
    }
  );
