import { Country, CountryData } from "../models/Country";
import { ReduxState } from "./ReduxState";

export interface CountryState extends ReduxState {
  data: CountryData | null;
  selectedCountry: Country | null;
}
