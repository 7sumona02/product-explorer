import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  rating: z.number(),
  brand: z.string(),
  category: z.string(),
  description: z.string(),

  thumbnail: z.string().url(),
  images: z.array(z.string().url()),

  discountPercentage: z.number(),
  warrantyInformation: z.string().optional(),
  availabilityStatus: z.string().optional(),
  shippingInformation: z.string().optional(),

  minimumOrderQuantity: z.number(),

  reviews: z.array(
    z.object({
      reviewerName: z.string(),
      rating: z.number(),
      comment: z.string(),
    })
  ).optional(),
});

export type Product = z.infer<typeof productSchema>;
