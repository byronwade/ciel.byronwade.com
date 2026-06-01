import Link from "next/link";
import { footerNav } from "@/lib/routes";

export function MarketingFooter() {
  return (
    <footer className="border-t mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Ciel</span>
            <span className="text-sm text-muted-foreground">
              Deployment without surprise bills.
            </span>
          </div>
          <nav className="flex flex-wrap gap-4">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
