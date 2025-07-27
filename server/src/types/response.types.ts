export interface IApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T | null;
}

export interface IApiErrorResponse {
  status: false;
  message: string;
  data: null;
  errors?: Record<string, string[]>;
}

export type ApiResponse<T = any> = IApiResponse<T> | IApiErrorResponse;
