import Link from "next/link";
import { docsNav } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function DocsLayout({ children, activeHref }: { children: React.ReactNode; activeHref?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-56 shrink-0">
          <nav className="flex flex-col gap-1 sticky top-20">
            <Link href="/docs" className="font-semibold mb-2">Documentation</Link>
            {docsNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm py-1.5 px-2 rounded-md hover:bg-muted",
                  activeHref === item.href && "bg-muted font-medium"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="flex-1 min-w-0 prose prose-neutral dark:prose-invert max-w-none">
          {children}
        </article>
      </div>
    </div>
  );
}
