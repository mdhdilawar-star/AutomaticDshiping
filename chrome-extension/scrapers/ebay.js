export function scrapeEbay() {
  return {
    sourceMarketplace: "ebay",
    sourceUrl: window.location.href,
    title: document.querySelector("h1")?.textContent?.trim() || "Unknown title",
    description: document.querySelector("meta[name='description']")?.content || "",
    pricing: {
      basePrice: normalizePrice(document.body.innerText),
      discountedPrice: null,
      shippingOptions: []
    },
    images: Array.from(document.querySelectorAll("img")).slice(0, 8).map((img) => img.src),
    variants: [],
    supplier: {
      name: "eBay Seller",
      rating: 0,
      reviews: 0,
      orderVolume: 0
    },
    capturedAt: new Date().toISOString()
  };
}

function normalizePrice(text) {
  const match = text.match(/US\s?\$\s?(\d+[\d,.]*)/i) || text.match(/\$\s?(\d+[\d,.]*)/);
  return match ? Number(match[1].replace(/,/g, "")) : 0;
}
