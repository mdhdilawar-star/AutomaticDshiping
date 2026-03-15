export function calculateSuggestedPrice({ basePrice, shippingCost = 0, feePercent = 0.12, marginPercent = 0.3 }) {
  const cost = basePrice + shippingCost;
  const withFees = cost / (1 - feePercent);
  return Number((withFees * (1 + marginPercent)).toFixed(2));
}
