// utils/cookie.ts
import Cookies from "js-cookie";

export interface CookieAttributes {
  expires?: number | Date | undefined;
  path?: string | undefined;
  domain?: string | undefined;
  secure?: boolean | undefined;
  sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined;
  [property: string]: unknown;
}

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const gelAllCookie = () => {
  return Cookies.get();
};

export const hasCookie = (name: string) => {
  return Cookies.get(name) !== undefined;
};

export const setCookie = (
  key: string,
  value: string,
  options?: CookieAttributes
) => {
  return Cookies.set(key, value, options);
};

export const deleteCookie = (key: string) => {
  return Cookies.remove(key);
};
