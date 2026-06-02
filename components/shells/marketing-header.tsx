import Link from "next/link";
import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { marketingNav } from "@/lib/routes";
import { MarketingMobileNav } from "@/components/shells/marketing-mobile-nav";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-brand-foreground shadow-card">
              <Cloud className="size-4" />
            </span>
            <span className="text-lg">Ciel</span>
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/auth/signup">Start deploying</Link>
          </Button>
          <MarketingMobileNav />
        </div>
      </div>
    </header>
  );
}
