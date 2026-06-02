import Link from "next/link";
import { Cloud } from "lucide-react";
import { footerNav } from "@/lib/routes";

export function MarketingFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <Cloud className="size-4" />
              </span>
              Ciel
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Deployment without surprise bills. Predictable cost, understandable
              security, and legible deployment states.
            </p>
            <Link
              href="/status"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="size-1.5 rounded-full bg-brand" /> All systems operational
            </Link>
          </div>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ciel. A frontend-only prototype.</span>
          <span>Preview URLs on *.ciel.app</span>
        </div>
      </div>
    </footer>
  );
}
