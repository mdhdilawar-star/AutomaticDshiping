export function logInfo(event, context = {}) {
  console.log(JSON.stringify({ level: "info", event, ...context, ts: new Date().toISOString() }));
}

export function logError(event, error, context = {}) {
  console.error(
    JSON.stringify({
      level: "error",
      event,
      message: error?.message || "unknown",
      code: error?.code,
      stack: error?.stack,
      ...context,
      ts: new Date().toISOString()
    })
  );
}
