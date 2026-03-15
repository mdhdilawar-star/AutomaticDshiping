const apiInput = document.getElementById("api-url");
const status = document.getElementById("status");

(async function init() {
  const { apiUrl } = await chrome.storage.sync.get(["apiUrl"]);
  apiInput.value = apiUrl || "http://localhost:3000";
})();

document.getElementById("save").addEventListener("click", async () => {
  await chrome.storage.sync.set({ apiUrl: apiInput.value.trim() });
  status.textContent = "Saved.";
});
