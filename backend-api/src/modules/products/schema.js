import { z } from "zod";

export const productImportSchema = z.object({
  sourceMarketplace: z.string(),
  sourceUrl: z.string().url(),
  title: z.string().min(1),
  description: z.string().optional().default(""),
  pricing: z.object({
    basePrice: z.number().nonnegative(),
    discountedPrice: z.number().nullable().optional(),
    shippingOptions: z.array(z.any()).default([])
  }),
  images: z.array(z.string()).default([]),
  variants: z.array(z.any()).default([]),
  supplier: z.object({
    name: z.string().optional().default("Unknown"),
    rating: z.number().optional().default(0),
    reviews: z.number().optional().default(0),
    orderVolume: z.number().optional().default(0)
  }),
  capturedAt: z.string().optional()
});
