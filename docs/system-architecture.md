# System Architecture Recommendation

## 1) High-Level Architecture

```text
[Chrome Extension MV3]
   ├─ content scripts + supplier adapters
   ├─ popup/product editor
   └─ background service worker
          │ HTTPS (JWT)
          ▼
[Backend API (Node.js/Express or Fastify)]
   ├─ Auth + RBAC
   ├─ Product ingestion + normalization
   ├─ Store integration modules
   ├─ Pricing/profit engine
   ├─ Webhook handlers
   └─ Command producer (queues/events)
          │
          ▼
[Automation Engine Workers]
   ├─ Price monitoring
   ├─ Inventory synchronization
   ├─ Order import/routing
   ├─ Tracking updates
   └─ Notification dispatch

[Merchant Dashboard (React/Next.js)] <--> [Backend API]

Data Layer:
- PostgreSQL (core transactional data)
- Redis (queues, distributed locks, hot cache)
- Object storage (images, exported reports, artifacts)
```

## 2) Monorepo Design (GitHub)

- `chrome-extension/`: MV3 extension, supplier adapters, product capture UI.
- `backend-api/`: API service, data models, auth, integrations, webhooks.
- `automation-engine/`: scheduled and event-driven worker jobs.
- `web-dashboard/`: merchant management and analytics frontend.
- `docs/`: architecture, API contracts, cloud deployment runbooks.

## 3) Chrome Extension Design

### MV3 Components
- `manifest.json`: host permissions for supported marketplaces.
- `src/background.js`: service worker for auth state + API calls.
- `src/content/index.js`: page detection + scraper bootstrap.
- `scrapers/*.js`: per-marketplace extraction strategy.
- `popup/*`: import action + product summary and quick edits.
- `options/*`: extension settings (API URL, profile, defaults).

### Standardized Product DTO

```json
{
  "sourceMarketplace": "aliexpress",
  "sourceUrl": "https://...",
  "externalId": "...",
  "title": "...",
  "description": "...",
  "pricing": {
    "basePrice": 0,
    "discountedPrice": 0,
    "shippingOptions": []
  },
  "images": ["..."],
  "variants": [{ "name": "Color", "values": ["Black"] }],
  "supplier": {
    "name": "...",
    "rating": 0,
    "reviews": 0,
    "orderVolume": 0
  },
  "capturedAt": "ISO-8601"
}
```

## 4) Backend API Design

### Core Modules
1. **Auth Module**
   - Signup/login, OAuth store connect, JWT rotation, MFA-ready.
2. **Product Module**
   - Ingestion, dedupe, normalization, media mapping, publishing pipeline.
3. **Integrations Module**
   - Shopify/Amazon/eBay/Woo/Daraz adapters (strategy pattern).
4. **Pricing Module**
   - Fixed/percentage markup, fees, shipping rules, margin floor.
5. **Orders Module**
   - Order pull/webhook intake, supplier checkout orchestration, tracking sync.
6. **Automation Control Module**
   - Per-store automation policies and schedules.

### API Pattern
- REST for dashboard/extension operations.
- Webhooks for marketplace events.
- Queue commands for long-running automation operations.

## 5) Automation Engine

### Job Types
- `price.monitor`: poll supplier/API and compare previous snapshots.
- `inventory.sync`: reconcile source stock vs channel listing.
- `order.process`: route order to supplier fulfillment workflow.
- `tracking.refresh`: fetch and push tracking statuses.
- `research.metrics`: collect demand/competition trend data.

### Execution Model
- Redis queue (BullMQ) + worker concurrency.
- Idempotency keys per listing/order event.
- Distributed lock to avoid duplicate updates.

## 6) Data Model (Essential Tables)

- `users`, `organizations`, `memberships`
- `stores`, `store_credentials`, `store_sync_settings`
- `supplier_products`, `product_variants`, `product_media`
- `listing_mappings` (source->target listing link)
- `pricing_rules`, `price_snapshots`
- `inventory_snapshots`, `stock_events`
- `orders`, `order_items`, `fulfillment_events`, `tracking_events`
- `automation_jobs`, `job_runs`, `webhook_events`
- `analytics_daily_metrics`

## 7) Security Recommendations

- OAuth2 where available; otherwise encrypted API keys.
- Encrypt credentials at rest (KMS envelope encryption).
- Strict schema validation (Zod/Joi) on every endpoint.
- Signed request verification for webhooks.
- HTTP security headers + CORS allowlist.
- Rate limiting per token/user/store.
- Audit logs for sensitive actions.

## 8) Scalability Strategy

- Split API and workers into independently autoscaled services.
- Use read replicas for analytics-heavy dashboard queries.
- Cache hot product + listing metadata in Redis.
- Partition high-volume event tables by date/store.
- Stream heavy analytics into warehouse later (BigQuery optional).

## 9) Future Expansion Ready

- Add AI services behind separate module boundaries:
  - title/description rewriting
  - product opportunity scoring
  - competitor intelligence
  - dynamic margin optimization
- Add new marketplace adapters by implementing shared provider contract.
