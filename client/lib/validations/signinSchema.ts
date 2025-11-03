import z from "zod";

export const signinSchema = z.object({
  email: z
    .string()
    .regex(
      /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      "Please enter a valid email address."
    ),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long."),
});

export type SigninFormFields = z.infer<typeof signinSchema>;
