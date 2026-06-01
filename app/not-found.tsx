import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        This route does not exist or may have moved. Check the URL or return to a known page.
      </p>
      <div className="flex gap-2">
        <Button render={<Link href="/" />}>Home</Button>
        <Button variant="outline" render={<Link href="/app/overview" />}>Dashboard</Button>
      </div>
    </div>
  );
}
