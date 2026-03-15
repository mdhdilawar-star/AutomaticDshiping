export function scrapeAmazon() {
  return {
    sourceMarketplace: "amazon",
    sourceUrl: window.location.href,
    title: document.getElementById("productTitle")?.textContent?.trim() || "Unknown title",
    description: document.querySelector("#feature-bullets")?.textContent?.trim() || "",
    pricing: {
      basePrice: readAmazonPrice(),
      discountedPrice: null,
      shippingOptions: []
    },
    images: Array.from(document.querySelectorAll("#altImages img")).map((img) => img.src),
    variants: [],
    supplier: {
      name: "Amazon Seller",
      rating: 0,
      reviews: 0,
      orderVolume: 0
    },
    capturedAt: new Date().toISOString()
  };
}

function readAmazonPrice() {
  const whole = document.querySelector(".a-price-whole")?.textContent || "0";
  const fraction = document.querySelector(".a-price-fraction")?.textContent || "00";
  return Number(`${whole.replace(/[^\d]/g, "")}.${fraction.replace(/[^\d]/g, "")}`);
}
