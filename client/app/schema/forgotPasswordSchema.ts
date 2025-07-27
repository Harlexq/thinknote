import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "E-Mail required.")
    .email("Please enter a valid e-mail."),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
