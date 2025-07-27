export interface AsyncThunkType {
  rejectValue: string;
}

export interface ApiDefaultResponse {
  status: boolean;
  message: string;
  data: null;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  status: false;
  message: string;
  data: null;
  errors?: Record<string, string[]>;
}
