"use client";

import { usePathname } from "next/navigation";
import { AppChrome } from "@/components/shells/chrome/app-chrome";
import { CommandPalette } from "@/components/ciel/command-palette";
import { resolveChrome } from "@/components/shells/chrome/nav-context";

/**
 * Shared app shell: the floating context-aware chrome (launcher / breadcrumb /
 * toolbar / nav dock) over a full-bleed content surface. Replaces the legacy
 * sidebar + header chrome for both workspace and project routes.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ctx = resolveChrome(pathname);

  return (
    <>
      <AppChrome />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-7xl px-4 pt-20 pb-28 outline-none sm:pt-16 sm:pb-10 md:px-6"
      >
        {children}
      </main>
      <CommandPalette projectId={ctx.projectId} />
    </>
  );
}
