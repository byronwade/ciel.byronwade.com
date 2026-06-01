"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { TrafficAttribution } from "@/types";

const chartConfig = {
  human: { label: "Human", color: "hsl(var(--chart-1))" },
  bot: { label: "Bot", color: "hsl(var(--chart-2))" },
  verifiedCrawler: { label: "Verified Crawler", color: "hsl(var(--chart-3))" },
  preview: { label: "Preview", color: "hsl(var(--chart-4))" },
  blocked: { label: "Blocked", color: "hsl(var(--chart-5))" },
};

interface TrafficAttributionChartProps {
  data: TrafficAttribution;
}

export function TrafficAttributionChart({ data }: TrafficAttributionChartProps) {
  const chartData = [
    { category: "Human", value: data.human, fill: "var(--color-human)" },
    { category: "Bot", value: data.bot, fill: "var(--color-bot)" },
    { category: "Crawler", value: data.verifiedCrawler, fill: "var(--color-verifiedCrawler)" },
    { category: "Preview", value: data.preview, fill: "var(--color-preview)" },
    { category: "Blocked", value: data.blocked, fill: "var(--color-blocked)" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart data={chartData} layout="vertical" margin={{ left: 80 }}>
          <CartesianGrid horizontal={false} />
          <YAxis dataKey="category" type="category" width={75} tick={{ fontSize: 12 }} />
          <XAxis type="number" tick={{ fontSize: 12 }} unit=" GB" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" radius={4} />
        </BarChart>
      </ChartContainer>
      <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <div className="rounded-md border p-2">
          <div className="text-muted-foreground">Cached</div>
          <div className="font-medium tabular-nums">{data.cached} GB</div>
        </div>
        <div className="rounded-md border p-2">
          <div className="text-muted-foreground">Uncached</div>
          <div className="font-medium tabular-nums">{data.uncached} GB</div>
        </div>
        <div className="rounded-md border p-2">
          <div className="text-muted-foreground">Preview</div>
          <div className="font-medium tabular-nums">{data.preview} GB</div>
        </div>
        <div className="rounded-md border p-2">
          <div className="text-muted-foreground">Blocked</div>
          <div className="font-medium tabular-nums">{data.blocked} GB</div>
        </div>
      </div>
    </div>
  );
}
