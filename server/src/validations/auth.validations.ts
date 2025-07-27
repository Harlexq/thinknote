import { t } from "elysia";

export const authValidations = {
  register: t.Object({
    email: t.String({
      format: "email",
      error: "Geçerli bir email adresi giriniz.",
    }),
    password: t.String({
      minLength: 8,
      error: "Şifre en az 8 karakter olmalıdır.",
    }),
    confirmPassword: t.String({
      minLength: 8,
      error: "Şifre tekrarı en az 8 karakter olmalıdır.",
    }),
    firstName: t.String({
      minLength: 2,
      error: "Ad en az 2 karakter olmalıdır.",
    }),
    lastName: t.String({
      minLength: 2,
      error: "Soyad en az 2 karakter olmalıdır.",
    }),
    phoneNumber: t.String({
      pattern: "^[0-9\\s\\-\\(\\)]+$",
      error: "Geçerli bir telefon numarası giriniz.",
    }),
    phoneCountryId: t.Number({
      error: "Ülke seçimi zorunludur.",
    }),
  }),
  login: t.Object({
    email: t.String({
      format: "email",
      error: "Geçerli bir email adresi giriniz.",
    }),
    password: t.String({
      error: "Şifre alanı zorunludur.",
    }),
    rememberMe: t.Optional(t.Boolean()),
  }),
  refresh: t.Object({
    refreshToken: t.String({
      error: "Refresh token zorunludur.",
    }),
  }),
  logout: t.Object({
    refreshToken: t.String({
      error: "Refresh token zorunludur.",
    }),
  }),
  verifyEmail: t.Object({
    email: t.String({
      format: "email",
      error: "Geçerli bir email adresi giriniz.",
    }),
    code: t.String({
      minLength: 6,
      maxLength: 6,
      pattern: "^[0-9]{6}$",
      error: "Doğrulama kodu 6 haneli bir sayı olmalıdır.",
    }),
  }),
  resendVerification: t.Object({
    email: t.String({
      format: "email",
      error: "Geçerli bir email adresi giriniz.",
    }),
  }),
};
