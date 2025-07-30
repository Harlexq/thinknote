import { ApiResponse } from "./Api";

export interface Language {
  id: number;
  flag: string;
  name: string;
  iso: string;
}

export type LanguageResponse = ApiResponse<Language[]>;
