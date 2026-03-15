document.getElementById("open-options")?.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
  document.getElementById("status").textContent = "Settings opened";
});
