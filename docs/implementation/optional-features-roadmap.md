# Optional Features Roadmap (Supplemental)

## Feature-to-Technical Plan

1. **Multi-Currency Support**
   - Add FX rate provider adapter and conversion cache.
   - Persist source currency, converted currency, and conversion timestamp per product snapshot.

2. **Supplier Rating Alerts**
   - Extend supplier monitor worker to evaluate rating/review thresholds.
   - Trigger notifier events on threshold breaches.

3. **Advanced Analytics**
   - Add daily aggregation jobs for sales, margin, and return metrics.
   - Serve dashboard views via analytics module contracts.

4. **Bulk Product Import**
   - CSV + supplier list ingestion endpoint.
   - Chunk records and queue import jobs with progress tracking.

5. **Custom Automation Rules per Marketplace**
   - Rule scope hierarchy: org -> store -> marketplace -> product.
   - Rule evaluator invoked by worker handlers.

6. **Webhook Integration**
   - Provider-specific webhook validators + normalized event dispatcher.

7. **Automatic Image Optimization**
   - Image processing pipeline (resize/compress/webp conversion) before listing publish.

8. **Optional Google Sheets DB**
   - Connector for lightweight reports or temporary staging datasets.

9. **Error Recovery System**
   - Central retry policy + dead-letter queue + replay tooling.

10. **Notifications and Alerts**
    - Email/in-app/webhook notifier contracts.

11. **Modular Marketplace Integration**
    - Strict provider contracts + plugin registration table.

12. **Cloud Scalability**
    - Independent autoscaling services for API and workers.
