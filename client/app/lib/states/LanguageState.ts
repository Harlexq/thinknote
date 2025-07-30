import { Language } from "../models/Language";
import { ReduxState } from "./ReduxState";

export interface LanguageState extends ReduxState {
  languages: Language[];
}
