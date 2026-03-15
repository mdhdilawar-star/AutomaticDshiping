export function computeBackoffMs(attempt, baseMs = 1000, maxMs = 120000) {
  const exp = Math.min(maxMs, baseMs * 2 ** Math.max(0, attempt - 1));
  const jitter = Math.floor(Math.random() * Math.min(5000, exp * 0.2));
  return exp + jitter;
}

export function isRetryableError(error) {
  const code = error?.code || "";
  const message = String(error?.message || "").toLowerCase();

  if (["ETIMEDOUT", "ECONNRESET", "EAI_AGAIN", "429"].includes(code)) return true;
  if (message.includes("timeout") || message.includes("rate limit") || message.includes("temporarily unavailable")) {
    return true;
  }
  return false;
}
