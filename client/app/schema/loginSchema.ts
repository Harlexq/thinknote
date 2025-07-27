import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-Mail required."),
  password: z.string().min(1, "Password required."),
  rememberMe: z.boolean().optional(),
});


export type LoginSchema = z.infer<typeof loginSchema>;
