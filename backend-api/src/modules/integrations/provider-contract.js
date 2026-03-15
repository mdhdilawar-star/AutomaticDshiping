export class MarketplaceProvider {
  async publishProduct(_product, _credentials) {
    throw new Error("publishProduct not implemented");
  }

  async updateInventory(_listingId, _quantity, _credentials) {
    throw new Error("updateInventory not implemented");
  }

  async updatePrice(_listingId, _price, _credentials) {
    throw new Error("updatePrice not implemented");
  }

  async fetchOrders(_credentials) {
    throw new Error("fetchOrders not implemented");
  }
}
