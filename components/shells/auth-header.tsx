import Link from "next/link";
import { Cloud } from "lucide-react";

export function AuthHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-brand-foreground shadow-card">
            <Cloud className="size-4" />
          </span>
          <span className="text-lg">Ciel</span>
        </Link>
        <Link
          href="/app/support"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Support
        </Link>
      </div>
    </header>
  );
}
