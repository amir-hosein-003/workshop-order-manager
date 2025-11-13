import z from "zod";

export const NewProductSchema = z.object({
  name: z.string().min(4),
  description: z.string(),
  category: z.string(),
  price: z.string(),
  images: z.array(z.string()),
});

export type NewProductFormFields = z.infer<typeof NewProductSchema>;
