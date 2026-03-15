# Supplemental Implementation Plan (No Existing Code Changed)

This document extends the existing architecture with additional required capabilities while preserving all current features and code structure.

## 1) API Discovery and Integration Strategy

### Selection Principles
1. Prefer official APIs first (Shopify, Amazon SP-API, eBay Sell APIs, WooCommerce REST, Daraz Seller Center).
2. Use OAuth2 where available; otherwise encrypted API credentials.
3. Introduce a provider contract for each integration so new marketplaces plug in without core rewrites.
4. Use controlled scraping/page-analysis only where API coverage is unavailable and website terms allow it.

### Integration Layers
- **Connector layer**: low-level HTTP/auth/signing clients.
- **Provider adapter layer**: normalized methods (`publishProduct`, `updatePrice`, `fetchOrders`, etc.).
- **Domain orchestration layer**: applies automation rules and emits queue tasks.

## 2) Automation Workers and Background Processing

### Required Workers
- Supplier checks worker (price, stock, supplier rating changes).
- Product update worker (description/media/variant updates).
- Inventory synchronization worker (source -> destination).
- Order monitoring/fulfillment worker.
- Maintenance worker (cleanup, stale lock recovery, dead-letter processing).

### Reliability Rules
- Idempotency keys for each listing/order action.
- Exponential backoff + jitter for retries.
- Dead-letter queue for repeated failures.
- Distributed locks to prevent duplicate processing.

## 3) Data Management System

### Primary Data Store (recommended)
- PostgreSQL for transactional data.
- Redis for queue state, locks, and hot cache.
- Object storage for images/reports/log archives.

### Optional Lightweight Mode: Google Sheets
- Use Google Sheets for early-stage reporting or temporary storage.
- Keep repository interface abstraction so Sheets and PostgreSQL can be swapped with minimal impact.
- Batch reads/writes and cache frequently accessed ranges to reduce API quota usage.

## 4) Automation Configuration and Rules

Introduce rule entities configurable by user/store/marketplace:
- price adjustment rules (fixed/percent/floor/ceiling)
- stock monitoring intervals
- order trigger conditions
- product refresh intervals
- notification preferences

Rules should support inheritance:
`organization default -> store override -> marketplace override -> product override`.

## 5) Task Scheduling System

- Scheduler should support recurring cron jobs and event-triggered jobs.
- Allow concurrent execution with queue isolation per job family.
- Use locks to avoid overlapping runs for the same listing/store.
- Record run metadata (start/end/duration/error count) for observability.

## 6) Error Handling and Logging

- Structured JSON logs across API and worker services.
- Correlation IDs propagated from extension/dashboard -> backend -> workers.
- Error taxonomy (validation/auth/provider/transient/system).
- Alerting rules for critical incidents (sync failures, webhook signature failures, queue lag).

## 7) Performance Optimization

- Smart polling intervals with adaptive throttling.
- ETag/If-Modified-Since for external APIs where supported.
- Redis caching for frequently requested product/store metadata.
- Bulk APIs and batched updates to reduce network round trips.

## 8) Optional Feature Implementation Guidance

- Multi-currency support with FX-rate cache and conversion audit table.
- Supplier rating alerts using threshold-based worker checks.
- Advanced analytics through periodic aggregation jobs.
- Bulk product import through CSV parser + queued chunk processing.
- Per-marketplace automation rules with inheritance model.
- Webhook ingress/egress modules with signature verification.
- Image optimization pipeline before publish.
- Error recovery via retry policies and dead-letter reprocessing.
- Email/in-app notifications for critical automation events.

## 9) Future Extensibility

Design all new capabilities behind module contracts:
- provider contracts for marketplaces
- repository contracts for storage backends
- notifier contracts for channels (email/in-app/webhook)
- analytics contracts for dashboard datasets

This preserves long-term flexibility for AI research and dynamic pricing upgrades.
