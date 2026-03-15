export const TASK_CATALOG = [
  {
    name: "supplier-data-check",
    cron: "*/15 * * * *",
    queueJob: "price.monitor",
    description: "Checks supplier prices, stock, and rating thresholds."
  },
  {
    name: "inventory-sync",
    cron: "*/10 * * * *",
    queueJob: "inventory.sync",
    description: "Syncs listing stock to connected stores."
  },
  {
    name: "order-monitor",
    cron: "*/2 * * * *",
    queueJob: "order.process",
    description: "Imports and routes new orders for fulfillment."
  },
  {
    name: "tracking-refresh",
    cron: "*/30 * * * *",
    queueJob: "tracking.refresh",
    description: "Refreshes shipment tracking and pushes updates."
  }
];
