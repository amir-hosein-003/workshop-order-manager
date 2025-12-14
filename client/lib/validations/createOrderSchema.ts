import { z } from "zod";

export const createOrderSchema = z.object({
  quantity: z
    .number({
      error: "Quantity is required",
    })
    .min(1, "Quantity must be at least 1"),

  customerName: z
    .string()
    .min(3, "Customer name must be at least 3 characters")
    .optional()
    .or(z.literal("")),

  dueDate: z
    .string({
      error: "Due date is required",
    })
    .min(1, "Due date is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),

  priority: z.enum(["low", "normal", "high"]).optional(),

  notes: z
    .string()
    .max(500, "Note must be less than 500 characters")
    .optional(),
});

export type CreateOrderFormFields = z.infer<typeof createOrderSchema>;
