import { t } from "elysia";

export const countryValidations = {
  search: t.Object({
    search: t.Optional(t.String()),
  }),
  iso: t.Object({
    iso: t.String({
      minLength: 2,
      maxLength: 2,
      pattern: "^[A-Z]{2}$",
      error: "ISO kodu 2 harfli büyük harflerden oluşmalıdır.",
    }),
  }),
  code: t.Object({
    code: t.String({
      pattern: "^\\+[0-9]{1,4}$",
      error: "Geçerli bir ülke kodu giriniz (örn: +90).",
    }),
  }),
};
