import { SimpleAuthPage } from "@/components/auth/simple-auth-page";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RecoveryCodesPage() {
  const codes = ["a7k2-m9p4", "b3n8-q1r6", "c5t0-s2u7", "d8v3-w4x9", "e1y6-z5a0", "f4b7-c8d1"];

  return (
    <SimpleAuthPage title="Save your recovery codes" description="Each code works once. Store them securely.">
      <div className="grid grid-cols-2 gap-2 font-mono text-sm bg-muted rounded-md p-4">
        {codes.map((c) => <div key={c}>{c}</div>)}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Checkbox id="saved" />
        <Label htmlFor="saved" className="text-sm">I have saved these codes</Label>
      </div>
      <Button className="w-full mt-4" asChild><Link href="/app/overview">Continue</Link></Button>
    </SimpleAuthPage>
  );
}
