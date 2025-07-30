import { Document } from "mongoose";

export interface ICountry {
  id: number;
  name: string;
  code: string;
  iso: string;
  flag: string;
  mask: string | string[];
}

export interface ICountryDocument extends Omit<ICountry, "id">, Document {
  id: number;
}

export interface ICountryResponse {
  countries: ICountry[];
  total: number;
}