import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(300, { message: "Name cannot exceed 300 characters" }),

  price: z.number().positive({ message: "Price must be greater than 0" }),

  quantity: z.number().positive({ message: "Quantity must be greater than 0" }),

  category: z
    .string()
    .min(1, { message: "Category is required" })
    .max(50, { message: "Category cannot exceed 50 characters" }),

  imageId: z
    .string()
    .max(100, { message: "Image ID cannot exceed 100 characters" })
    .optional(),

  $id: z.string().optional(),
});
