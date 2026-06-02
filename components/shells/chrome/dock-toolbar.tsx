"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket, Plus, Share2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { resolveChrome } from "./nav-context";

const GHOST =
  "flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-dock-foreground transition-colors outline-none hover:bg-dock-active hover:text-dock-active-foreground focus-visible:ring-2 focus-visible:ring-white/30";
const PRIMARY =
  "flex h-8 items-center gap-1.5 rounded-full bg-dock-active-foreground px-3 text-[13px] font-semibold text-dock transition-opacity outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/30";

/** Contextual action toolbar, pinned top-right (inverse corner of the launcher). */
export function DockToolbar() {
  const pathname = usePathname();
  const ctx = resolveChrome(pathname);

  return (
    <div className="pointer-events-none fixed top-3 right-3 z-50 print:hidden">
      <div className="pointer-events-auto inline-flex transform-gpu items-center gap-0.5 rounded-3xl border border-white/5 bg-dock p-[3px] text-dock-foreground shadow-float">
        {ctx.kind === "project" ? (
          <>
            <Link
              href={`/app/projects/${ctx.projectId}/previews?dialog=share-preview`}
              className={cn(GHOST, "hidden sm:flex")}
            >
              <Share2 className="size-4" strokeWidth={2} />
              Share
            </Link>
            <Link href={`${pathname}?dialog=deploy-now`} className={PRIMARY}>
              <Rocket className="size-4" strokeWidth={2} />
              Deploy
            </Link>
          </>
        ) : (
          <Link href="/app/projects/new/source" className={PRIMARY}>
            <Plus className="size-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Create Project</span>
            <span className="sm:hidden">New</span>
          </Link>
        )}
      </div>
    </div>
  );
}
