import type { InvoiceLineItem, TrafficAttribution } from "@/types";

export const mockTrafficAttribution: TrafficAttribution = {
  human: 45.2,
  bot: 28.5,
  verifiedCrawler: 8.3,
  cached: 62.1,
  uncached: 19.9,
  preview: 12.4,
  blocked: 5.6,
};

export const mockLineItems: InvoiceLineItem[] = [
  { id: "li_1", description: "Production traffic — acme.com", category: "traffic", amount: 124.50, quantity: 830, unit: "GB" },
  { id: "li_2", description: "Preview traffic — 8 previews", category: "preview", amount: 18.20, quantity: 121, unit: "GB" },
  { id: "li_3", description: "Custom domains — 4 domains", category: "domains", amount: 0, quantity: 4, unit: "domains" },
  { id: "li_4", description: "Log retention — 30 days", category: "retention", amount: 12.00 },
  { id: "li_5", description: "Overage — bot traffic spike May 31", category: "overage", amount: 34.80, quantity: 232, unit: "GB" },
  { id: "li_6", description: "Production traffic — shop.acme.com", category: "traffic", amount: 96.30, quantity: 642, unit: "GB" },
  { id: "li_7", description: "Preview traffic — 14 previews", category: "preview", amount: 22.75, quantity: 152, unit: "GB" },
  { id: "li_8", description: "Custom domains — 12 domains", category: "domains", amount: 0, quantity: 12, unit: "domains" },
  { id: "li_9", description: "Log retention — extended 90 days (Storefront)", category: "retention", amount: 24.00 },
  { id: "li_10", description: "Overage — checkout traffic spike", category: "overage", amount: 51.20, quantity: 341, unit: "GB" },
];

export async function getTrafficAttribution(): Promise<TrafficAttribution> {
  return mockTrafficAttribution;
}

export async function getLineItems(): Promise<InvoiceLineItem[]> {
  return mockLineItems;
}
