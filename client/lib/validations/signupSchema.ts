import z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(4, "Full name must be at least 4 characters long."),
    email: z
      .string()
      .regex(
        /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
        "Please enter a valid email address."
      ),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "The password must be at least 8 characters long."),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm password does not match.",
        path: ["confirmPassword"],
      });
    }
  });

export type SignupFormFields = z.infer<typeof signupSchema>;
