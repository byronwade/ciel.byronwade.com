"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrafficAttributionChart } from "@/components/ciel";
import { mockTrafficAttribution } from "@/lib/mock";

export function PricingCalculator() {
  const [monthlyVisitors, setMonthlyVisitors] = useState(50000);
  const [avgPageWeight, setAvgPageWeight] = useState(1.2);
  const [previewCount, setPreviewCount] = useState(8);
  const [scenario, setScenario] = useState("normal");

  const multiplier = scenario === "crawler" ? 3.5 : scenario === "preview_burst" ? 2 : scenario === "asset_growth" ? 1.8 : 1;
  const estimatedGb = ((monthlyVisitors * avgPageWeight * multiplier) / 1000 + previewCount * 2.5).toFixed(1);
  const estimatedCost = (parseFloat(estimatedGb) * 0.15 + 15).toFixed(2);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Traffic calculator</h1>
        <p className="text-muted-foreground mt-2">
          Simulate normal growth, crawler spikes, PR-preview bursts, and asset-weight increases before they happen.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your traffic profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Monthly visitors</Label>
              <Input type="number" value={monthlyVisitors} onChange={(e) => setMonthlyVisitors(Number(e.target.value))} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Avg page weight (MB)</Label>
              <Input type="number" step="0.1" value={avgPageWeight} onChange={(e) => setAvgPageWeight(Number(e.target.value))} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Active previews</Label>
              <Input type="number" value={previewCount} onChange={(e) => setPreviewCount(Number(e.target.value))} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Scenario</Label>
              <Select value={scenario} onValueChange={(v) => v && setScenario(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal growth</SelectItem>
                  <SelectItem value="crawler">Crawler spike</SelectItem>
                  <SelectItem value="preview_burst">PR preview burst</SelectItem>
                  <SelectItem value="asset_growth">Asset weight increase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estimated monthly cost</CardTitle>
            <CardDescription>Pro plan ($15) + bandwidth at $0.15/GB</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tabular-nums">${estimatedCost}</div>
            <div className="text-sm text-muted-foreground mt-1">{estimatedGb} GB estimated transfer</div>
            <div className="mt-6">
              <TrafficAttributionChart data={mockTrafficAttribution} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
