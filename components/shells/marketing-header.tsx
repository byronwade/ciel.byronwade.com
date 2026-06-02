import Link from "next/link";
import { Button } from "@/components/ui/button";
import { marketingNav } from "@/lib/routes";
import { MarketingMobileNav } from "@/components/shells/marketing-mobile-nav";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Ciel
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
          <Button size="sm" asChild>
            <Link href="/auth/signup">Start Deploying</Link>
          </Button>
          <MarketingMobileNav />
        </div>
      </div>
    </header>
  );
}
