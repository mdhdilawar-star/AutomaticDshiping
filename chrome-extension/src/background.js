const DEFAULT_API_URL = "http://localhost:3000";

chrome.runtime.onInstalled.addListener(async () => {
  const current = await chrome.storage.sync.get(["apiUrl"]);
  if (!current.apiUrl) {
    await chrome.storage.sync.set({ apiUrl: DEFAULT_API_URL });
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "IMPORT_PRODUCT") return;

  (async () => {
    const { apiUrl, token } = await chrome.storage.sync.get(["apiUrl", "token"]);
    const response = await fetch(`${apiUrl || DEFAULT_API_URL}/api/products/import`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(message.payload)
    });

    const data = await response.json();
    sendResponse({ ok: response.ok, data });
  })().catch((error) => sendResponse({ ok: false, error: error.message }));

  return true;
});
