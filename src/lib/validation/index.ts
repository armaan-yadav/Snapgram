import * as z from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(2)
    .max(50, { message: "Name can not be more than 50 characters" }),
  username: z.string().min(2, { message: "Username is Too Short" }).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must of at least 8 characters" }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must of at least 8 characters" }),
});
