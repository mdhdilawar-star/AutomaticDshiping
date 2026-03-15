# AutomaticDshiping

A scalable dropshipping automation platform (AutoDS-like) with:

- **Chrome Extension (Manifest V3)** for supplier-page scraping and one-click import.
- **Node.js Backend API** for authentication, product normalization, store integrations, and orchestration.
- **Automation Engine** for price monitoring, inventory sync, order routing, and tracking updates.
- **Merchant Dashboard** for operations, analytics, and automation controls.

## Repository Layout

```text
chrome-extension/    # Product scraping + import UI (MV3)
backend-api/         # REST API and integration orchestration
automation-engine/   # Queue workers + scheduled automation
web-dashboard/       # Merchant operations UI
docs/                # Architecture, APIs, cloud deployment guidance
```

## Quick Start (Development)

1. Review architecture: `docs/system-architecture.md`
2. Start backend API:
   ```bash
   cd backend-api
   npm install
   npm run dev
   ```
3. Start automation worker:
   ```bash
   cd automation-engine
   npm install
   npm run dev
   ```
4. Load extension in Chrome: `chrome-extension/` via `chrome://extensions`.

## Core Product Workflow

1. Seller visits supported supplier product page.
2. Extension scraper extracts standardized product payload.
3. Seller clicks **Import Product**.
4. Backend stores product and applies pricing rules.
5. Merchant edits/publishes from dashboard to connected sales channels.
6. Automation engine continuously syncs pricing, stock, and order status.

## Supported Integrations (Initial Design)

### Supplier Sources
- AliExpress
- Amazon
- eBay
- Daraz.pk
- Alibaba
- CJ Dropshipping

### Selling Channels
- Shopify
- eBay Seller
- Amazon Seller
- WooCommerce
- Daraz Seller

## Security Defaults

- JWT access + refresh token rotation
- Encrypted secrets (KMS-managed in cloud)
- Request validation and centralized sanitization
- Rate limiting + per-user/per-store quotas
- Signed webhook verification for all marketplace callbacks

## Deployment Target

Google Cloud recommended stack:
- Cloud Run (API + worker services)
- Cloud SQL (PostgreSQL)
- Memorystore (Redis queues/caching)
- Cloud Storage (images/assets)
- Pub/Sub + Cloud Scheduler (automation triggers)
- Secret Manager + KMS (secrets/key mgmt)
- Cloud Monitoring + Error Reporting + Cloud Logging

See `docs/google-cloud-blueprint.md` for details.
