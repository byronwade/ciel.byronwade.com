import type { Metadata } from "next";
import { PricingCalculator } from "./calculator-client";

export const metadata: Metadata = {
  title: "Pricing Calculator",
  description: "Estimate your monthly cost based on traffic, bandwidth, and build minutes.",
};

export default function PricingCalculatorPage() {
  return <PricingCalculator />;
}
