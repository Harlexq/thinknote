import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name required.")
      .min(2, "The first name must be at least 2 characters long.")
      .max(16, "The first name must be no longer than 16 characters."),
    lastName: z
      .string()
      .min(1, "Last name required.")
      .min(2, "The last name must be at least 2 characters long.")
      .max(16, "The last name must be no longer than 16 characters."),
    email: z
      .string()
      .min(1, "E-Mail required.")
      .email("Please enter a valid e-mail."),
    phoneNumber: z.string().min(1, "Phone number required."),
    phoneCountryId: z.number({
      error: "Phone country code required.",
    }),
    password: z
      .string()
      .min(1, "Password required.")
      .min(6, "The password must be at least 6 characters long.")
      .max(16, "The password must be no longer than 16 characters."),
    confirmPassword: z.string().min(1, "Password verification is required."),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
