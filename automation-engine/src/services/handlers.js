export async function handlePriceMonitor(data) {
  return { checked: true, listingId: data.listingId, changed: false };
}

export async function handleInventorySync(data) {
  return { synced: true, listingId: data.listingId, quantity: data.quantity ?? 0 };
}

export async function handleOrderProcess(data) {
  return { processed: true, orderId: data.orderId };
}

export async function handleTrackingRefresh(data) {
  return { refreshed: true, orderId: data.orderId };
}
