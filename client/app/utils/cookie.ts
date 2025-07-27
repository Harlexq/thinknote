"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name);
};

export const setAllCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.getAll();
};

export const hasCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.has(name);
};

export const setCookie = async (
  key: string,
  value: string,
  options?: Partial<ResponseCookie>
) => {
  const cookieStore = await cookies();
  return cookieStore.set(key, value, options);
};

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.delete(key);
};
