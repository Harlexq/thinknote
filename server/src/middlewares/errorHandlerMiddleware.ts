import { Elysia } from "elysia";
import { ApiResponse } from "../utils/response.utils";

export const errorHandlerMiddleware = new Elysia().onError(
  ({ error, set, code }) => {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as Error).message
        : "";

    switch (code) {
      case "VALIDATION":
        set.status = 400;
        return ApiResponse.error("Validasyon hatası");

      case "NOT_FOUND":
        set.status = 404;
        return ApiResponse.error("Endpoint bulunamadı.");

      case "PARSE":
        set.status = 400;
        return ApiResponse.error("Geçersiz istek formatı.");

      case "INTERNAL_SERVER_ERROR":
        set.status = 500;
        return ApiResponse.error("Sunucu hatası oluştu.");

      case "INVALID_COOKIE_SIGNATURE":
        set.status = 400;
        return ApiResponse.error("Geçersiz çerez imzası.");

      default:
        if (error instanceof Error) {
          if (
            errorMessage.includes("Unauthorized") ||
            errorMessage.includes("JWT") ||
            errorMessage.includes("Token") ||
            errorMessage.includes("jwt")
          ) {
            set.status = 401;
            return ApiResponse.error(errorMessage || "Yetkilendirme hatası.");
          }

          if (errorMessage.includes("Forbidden")) {
            set.status = 403;
            return ApiResponse.error(errorMessage || "Erişim reddedildi.");
          }

          if (
            errorMessage.includes("MongoError") ||
            errorMessage.includes("mongoose")
          ) {
            set.status = 500;
            return ApiResponse.error("Veritabanı hatası oluştu.");
          }

          if (
            errorMessage.includes("zaten") ||
            errorMessage.includes("bulunamadı") ||
            errorMessage.includes("geçersiz") ||
            errorMessage.includes("eşleşm") ||
            errorMessage.includes("doğrula")
          ) {
            set.status = 400;
            return ApiResponse.error(errorMessage);
          }
        }

        set.status = 500;
        return ApiResponse.error(
          process.env.NODE_ENV === "development"
            ? errorMessage || "Beklenmeyen bir hata oluştu."
            : "Beklenmeyen bir hata oluştu."
        );
    }
  }
);
