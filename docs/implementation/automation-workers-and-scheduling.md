# Automation Workers, Scheduling, and Reliability

## Worker Groups

1. **supplier-monitor-worker**
   - checks supplier price/stock/rating
   - emits `price.monitor` and `inventory.sync`

2. **listing-sync-worker**
   - applies pricing/stock updates to selling channels

3. **order-orchestrator-worker**
   - imports new orders, maps supplier SKUs, sends fulfillment requests

4. **tracking-worker**
   - pulls carrier/supplier tracking and updates target store

5. **maintenance-worker**
   - retries dead-letter jobs, cleans stale locks, archives logs

## Scheduling Model

- Cron-based schedule for periodic tasks (Cloud Scheduler or in-service scheduler).
- Event-driven schedule for webhooks and dashboard actions.
- Queue partitioning by job type to prevent starvation.

## Retry / Backoff

- Retry transient provider/network errors up to configurable max attempts.
- Exponential backoff with jitter.
- Non-retryable errors (validation/auth/signature) sent directly to dead-letter queue.

## Observability

Each job run should emit:
- `jobType`, `jobId`, `storeId`, `listingId/orderId`
- latency and attempt count
- final status and error category
- correlation ID
