// app/utils/errorHandler.ts
import { AxiosError } from "axios";
import { ApiResponse, ApiErrorResponse } from "../lib/models/Api";

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      const apiResponse = error.response.data as ApiErrorResponse;

      // Validation errors
      if (apiResponse.errors) {
        const firstError = Object.values(apiResponse.errors)[0];
        if (firstError && firstError.length > 0) {
          return firstError[0];
        }
      }

      if (apiResponse.message) {
        return apiResponse.message;
      }
    }

    // HTTP status errors
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return "Geçersiz istek. Lütfen bilgilerinizi kontrol edin.";
        case 401:
          return "Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.";
        case 403:
          return "Bu işlem için yetkiniz bulunmamaktadır.";
        case 404:
          return "Aradığınız kaynak bulunamadı.";
        case 422:
          return "Girdiğiniz bilgilerde hata var. Lütfen kontrol edin.";
        case 500:
          return "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
        case 503:
          return "Servis şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.";
        default:
          return `Bir hata oluştu. (Kod: ${error.response.status})`;
      }
    }

    // Network errors
    if (error.code === "ECONNABORTED") {
      return "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.";
    }
    if (error.code === "ERR_NETWORK") {
      return "Ağ bağlantısı kurulamadı. İnternet bağlantınızı kontrol edin.";
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Beklenmeyen bir hata oluştu.";
};

export const handleApiResponse = <T>(
  response: ApiResponse<T>
): {
  status: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]>;
} => {
  return {
    status: response.status,
    message: response.message,
    data: response.data,
    errors: response.errors,
  };
};
