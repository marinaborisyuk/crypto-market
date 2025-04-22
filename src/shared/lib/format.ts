export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price;

  if (numPrice > 1) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numPrice);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(numPrice);
};

export const formatMarketCap = (marketCap: string | number): string => {
  const numMarketCap = typeof marketCap === "string" ? Number.parseFloat(marketCap) : marketCap;

  if (numMarketCap >= 1e12) {
    return `${(numMarketCap / 1e12).toFixed(2)}T`;
  }

  if (numMarketCap >= 1e9) {
    return `${(numMarketCap / 1e9).toFixed(2)}B`;
  }

  if (numMarketCap >= 1e6) {
    return `${(numMarketCap / 1e6).toFixed(2)}M`;
  }

  return formatPrice(numMarketCap);
};

export const formatPercentage = (percent: string | number): string => {
  const numPercent = typeof percent === "string" ? Number.parseFloat(percent) : percent;
  return `${numPercent >= 0 ? "+" : ""}${numPercent.toFixed(2)}%`;
};