import dotenv from "dotenv";
import { Queue, Worker } from "bullmq";
import { connection } from "./queues/connection.js";
import { JOBS } from "./jobs/types.js";
import {
  handleInventorySync,
  handleOrderProcess,
  handlePriceMonitor,
  handleTrackingRefresh
} from "./services/handlers.js";

dotenv.config();

const queueName = process.env.QUEUE_NAME || "automation";
const queue = new Queue(queueName, { connection });

const handlers = {
  [JOBS.PRICE_MONITOR]: handlePriceMonitor,
  [JOBS.INVENTORY_SYNC]: handleInventorySync,
  [JOBS.ORDER_PROCESS]: handleOrderProcess,
  [JOBS.TRACKING_REFRESH]: handleTrackingRefresh
};

new Worker(
  queueName,
  async (job) => {
    const handler = handlers[job.name];
    if (!handler) throw new Error(`No handler for ${job.name}`);
    const result = await handler(job.data);
    console.log(`Completed ${job.name}`, result);
    return result;
  },
  { connection }
);

(async () => {
  await queue.add(JOBS.PRICE_MONITOR, { listingId: "demo-listing-1" });
  await queue.add(JOBS.INVENTORY_SYNC, { listingId: "demo-listing-1", quantity: 25 });
})();

console.log("Automation worker running");
