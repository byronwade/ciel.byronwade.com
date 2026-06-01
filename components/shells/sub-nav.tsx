"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SubNavProps {
  items: readonly { label: string; href: string }[];
}

export function SubNav({ items }: SubNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 border-b mb-6 overflow-x-auto">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-3 py-2 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors",
            pathname.startsWith(item.href)
              ? "border-primary text-foreground font-medium"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
