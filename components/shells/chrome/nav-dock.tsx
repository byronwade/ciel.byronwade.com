"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Moon, Search, Sun } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { resolveChrome, isNavActive } from "./nav-context";

const ITEM =
  "relative flex size-8 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/30";
const ITEM_IDLE = "text-dock-foreground hover:bg-dock-active hover:text-dock-active-foreground";
const ITEM_ACTIVE = "bg-dock-active text-dock-active-foreground";

function openSearch() {
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
}

/**
 * Floating primary navigation dock — context-aware (workspace vs project). Centered
 * at the top on sm+, flipping to a centered bottom bar on phones. Carries the
 * curated primary destinations plus a trailing utility cluster.
 */
export function NavDock() {
  const pathname = usePathname();
  const ctx = resolveChrome(pathname);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <TooltipProvider delay={350}>
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-auto sm:top-3 print:hidden">
        <nav
          aria-label="Primary"
          className="pointer-events-auto flex max-w-[calc(100vw-2rem)] items-center gap-1 rounded-3xl border border-white/5 bg-dock p-[3px] text-dock-foreground shadow-float"
        >
          {ctx.primary.map((item) => {
            const active = isNavActive(item.href, pathname);
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger
                  render={
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/30 sm:px-3",
                        active ? ITEM_ACTIVE : ITEM_IDLE,
                      )}
                    />
                  }
                >
                  <item.icon className="size-4 shrink-0" strokeWidth={2} />
                  <span className="hidden sm:inline">{item.label}</span>
                </TooltipTrigger>
                <TooltipContent sideOffset={10} className="sm:hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

          <span className="mx-1.5 h-5 w-px shrink-0 self-center bg-white/10" aria-hidden />

          <Tooltip>
            <TooltipTrigger
              render={
                <button type="button" onClick={openSearch} aria-label="Search (⌘K)" className={cn(ITEM, ITEM_IDLE)} />
              }
            >
              <Search className="size-4 shrink-0" strokeWidth={2} />
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>Search · ⌘K</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Link href="/app/notifications" aria-label="Notifications" className={cn(ITEM, ITEM_IDLE)} />
              }
            >
              <Bell className="size-4 shrink-0" strokeWidth={2} />
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>Notifications</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className={cn(ITEM, ITEM_IDLE)}
                />
              }
            >
              <Moon className="size-4 shrink-0 dark:hidden" strokeWidth={2} />
              <Sun className="hidden size-4 shrink-0 dark:block" strokeWidth={2} />
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>Toggle theme</TooltipContent>
          </Tooltip>
        </nav>
      </div>
    </TooltipProvider>
  );
}
