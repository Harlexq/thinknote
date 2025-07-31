import { ApiResponse } from "./Api";

export interface Country {
  _id: string;
  id: number;
  name: string;
  code: string;
  iso: string;
  flag: string;
  mask: string | string[];
}

export interface CountryData {
  countries: Country[];
  total: number;
}

export type CountryResponse = ApiResponse<CountryData>;
