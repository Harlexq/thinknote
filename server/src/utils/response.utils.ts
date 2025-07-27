import { IApiResponse, IApiErrorResponse } from "../types/response.types";

export class ApiResponse {
  static success<T>(
    data: T,
    message: string = "İşlem başarıyla gerçekleşti."
  ): IApiResponse<T> {
    return {
      status: true,
      message,
      data,
    };
  }

  static error(
    message: string = "İşlem gerçekleştirilemedi.",
    errors?: Record<string, string[]>
  ): IApiErrorResponse {
    return {
      status: false,
      message,
      data: null,
      ...(errors && { errors }),
    };
  }
}
