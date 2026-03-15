# Google Cloud Blueprint

## Recommended Services

- **Cloud Run**: host stateless backend API + automation worker services.
- **Cloud SQL (PostgreSQL)**: transactional system of record.
- **Memorystore (Redis)**: queues, locks, cache.
- **Cloud Storage**: product images, exports, logs artifacts.
- **Pub/Sub**: event fanout between services.
- **Cloud Scheduler**: cron triggers for monitoring/sync cycles.
- **Secret Manager**: API keys and integration secrets.
- **Cloud KMS**: encryption key management.
- **Cloud Armor**: API protection and threat mitigation.
- **Cloud Monitoring + Logging + Error Reporting**: observability.
- **Identity Platform or Firebase Auth** (optional): managed auth if desired.

## Deployment Topology

1. `backend-api` -> Cloud Run service (`api-prod`).
2. `automation-engine` -> Cloud Run service (`worker-prod`) and/or Cloud Run jobs.
3. Cloud SQL private IP + Serverless VPC access.
4. Memorystore in same region.
5. Artifact Registry for container images.
6. Cloud Build triggers from GitHub for CI/CD.

## Security Baseline

- Private service-to-service auth with IAM service accounts.
- Least privilege IAM roles per microservice.
- Rotate secrets via Secret Manager.
- Signed webhook endpoints with replay protection.
- Binary authorization + vulnerability scanning in CI/CD.

## CI/CD Pipeline (GitHub + GCP)

1. PR checks: lint/test/typecheck.
2. Build container images.
3. Push image to Artifact Registry.
4. Deploy to staging Cloud Run.
5. Run smoke tests.
6. Promote to production with approvals.

## Cost/Scale Notes

- Start with single-region deployment for low latency and simplicity.
- Use autoscaling caps on worker service to control queue burst costs.
- Move long-running heavy workloads to GKE only if Cloud Run limits are exceeded.
