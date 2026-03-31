export const FRONTEND_PRICE_OVERRIDES: Record<string, number> = {
  retatrutide: 60,
  "melanotan-ii": 20,
  ipamorelin: 30,
  "cjc-1295": 60,
  "ghk-cu": 30,
  "bpc-157": 40,
  "bac-water": 10,
};

export function getFrontendPrice(slug?: string, fallbackPrice?: number) {
  if (!slug) return fallbackPrice ?? 0;
  return FRONTEND_PRICE_OVERRIDES[slug] ?? fallbackPrice ?? 0;
}

export function getOriginalPrice(slug?: string, currentPrice?: number) {
  if (!slug) return currentPrice ?? 0;
  if (slug === "bac-water") return getFrontendPrice(slug, currentPrice);
  return getFrontendPrice(slug, currentPrice) + 20;
}

export function getDiscountLabel(slug?: string) {
  if (slug === "bac-water") return null;
  return "Save $20";
}
