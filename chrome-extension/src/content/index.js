import { scrapeAliExpress } from "../../scrapers/aliexpress.js";
import { scrapeAmazon } from "../../scrapers/amazon.js";
import { scrapeEbay } from "../../scrapers/ebay.js";

const SCRAPER_MAP = [
  { test: /aliexpress\.com/i, scrape: scrapeAliExpress },
  { test: /amazon\./i, scrape: scrapeAmazon },
  { test: /ebay\./i, scrape: scrapeEbay }
];

function detectScraper() {
  return SCRAPER_MAP.find(({ test }) => test.test(window.location.hostname))?.scrape;
}

function mountImportButton(scrapeFn) {
  if (document.getElementById("droppilot-import-btn")) return;

  const button = document.createElement("button");
  button.id = "droppilot-import-btn";
  button.textContent = "Import Product";
  Object.assign(button.style, {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    zIndex: "2147483647",
    border: "none",
    borderRadius: "8px",
    background: "#111827",
    color: "#ffffff",
    padding: "10px 16px",
    cursor: "pointer"
  });

  button.addEventListener("click", () => {
    const payload = scrapeFn();
    chrome.runtime.sendMessage({ type: "IMPORT_PRODUCT", payload }, (result) => {
      const label = result?.ok ? "Imported" : `Failed: ${result?.error || "Unknown error"}`;
      button.textContent = label;
      setTimeout(() => (button.textContent = "Import Product"), 3000);
    });
  });

  document.body.appendChild(button);
}

const scraper = detectScraper();
if (scraper) {
  mountImportButton(scraper);
}
