import type { Metadata } from "next";
import { MarketingPage, RoadmapItem } from "@/components/marketing/marketing-page";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What we're building next on the Ciel platform.",
};

export default function RoadmapPage() {
  return (
    <MarketingPage title="Roadmap" description="What we're building next.">
      <RoadmapItem status="Now" title="Traffic attribution v2" desc="Per-path and per-domain breakdown with bot classification improvements." />
      <RoadmapItem status="Now" title="Self-host preview" desc="Docker-based self-host bundle with config export parity." />
      <RoadmapItem status="Next" title="SSO & SCIM" desc="Enterprise identity provider integration with role mapping." />
      <RoadmapItem status="Next" title="Edge routing rules" desc="Branch-based preview domains, trailing slash policy, robots.txt control." />
      <RoadmapItem status="Later" title="SIEM streaming" desc="Export security and activity events to your observability stack." />
      <RoadmapItem status="Later" title="Multi-region deploys" desc="Choose deployment regions with latency and cost transparency." />
    </MarketingPage>
  );
}
