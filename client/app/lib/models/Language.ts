import { ApiResponse } from "./Api";

export interface Language {
  _id: string;
  flag: string;
  name: string;
  iso: string;
}

export type LanguageResponse = ApiResponse<Language[]>;
