# Data Management and Storage Plan

## Canonical Entities

- Users and auth sessions
- Organizations, stores, and integration credentials
- Supplier products and normalized variants
- Listing mappings between supplier and destination channels
- Orders, fulfillment states, and tracking events
- Automation rules and scheduler definitions
- Job run logs and system audit events

## Storage Abstraction

Use repository interfaces so business logic is not tied to one datastore.

### Backends
1. **Primary**: PostgreSQL + Redis
2. **Optional/temporary**: Google Sheets for selected lightweight datasets (reports/prototypes)

## Google Sheets Option (Supplemental)

### Use Cases
- Temporary reporting table
- Manual QA review queue
- Early-stage low-volume product audit logs

### Guardrails
- Do not store long-term secrets in Sheets.
- Enforce schema headers and validation in connector.
- Use batched reads/writes and periodic compaction.

## Migration Path

1. Keep repository interfaces stable.
2. Introduce Postgres repositories in parallel with Sheets repositories.
3. Migrate by table/domain with dual-write shadow period if needed.
4. Cut over reads once parity is validated.
