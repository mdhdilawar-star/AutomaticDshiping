# API Discovery Matrix

| Domain | Preferred API | Auth Type | Priority | Notes |
|---|---|---:|---:|---|
| Shopify selling | Shopify Admin API | OAuth2 | P0 | Product, inventory, orders, webhooks |
| Amazon selling | Amazon SP-API | OAuth2 + AWS SigV4 | P0 | Listings, orders, reports |
| eBay selling | eBay Sell APIs | OAuth2 | P0 | Inventory, offers, fulfillment |
| WooCommerce selling | WooCommerce REST | Consumer key/secret | P0 | Product/order sync |
| Daraz selling | Daraz Seller Center API | API key/secret (per docs) | P1 | Orders, products, status sync |
| AliExpress supplier | Official/partner APIs when available | Varies | P1 | Prefer official channel integrations |
| Alibaba supplier | Open platform APIs | OAuth/key-based | P1 | Product source workflows |
| CJ Dropshipping | CJ API | API key/token | P1 | Product/order/fulfillment |
| Generic suppliers | Controlled page analysis | N/A | P2 | Use only where permitted |

## Provider Contract (Normalized)

All marketplace modules should implement:

- `connect(credentials)`
- `publishProduct(product)`
- `updatePrice(listingId, price)`
- `updateInventory(listingId, quantity)`
- `fetchOrders(cursor)`
- `pushTracking(orderId, tracking)`
- `validateWebhook(signature, payload)`

This keeps the core orchestration agnostic to marketplace specifics.
