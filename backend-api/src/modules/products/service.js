import { calculateSuggestedPrice } from "../pricing/calculator.js";

const inMemoryProducts = [];

export function importProduct(product, userId = "demo-user") {
  const suggestedPrice = calculateSuggestedPrice({ basePrice: product.pricing.basePrice });

  const record = {
    id: `prod_${Date.now()}`,
    userId,
    ...product,
    suggestedPrice,
    createdAt: new Date().toISOString()
  };

  inMemoryProducts.push(record);
  return record;
}

export function listProducts(userId = "demo-user") {
  return inMemoryProducts.filter((p) => p.userId === userId);
}
