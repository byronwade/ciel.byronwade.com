"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Cloud, LayoutGrid, Moon, Sun, X, ChevronLeft, LogOut, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { resolveChrome, isNavActive } from "./nav-context";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * Top-left launcher — a slim horizontal identity pill in dark `--dock` material
 * that morphs in place into a full navigation browse panel for the active context
 * (workspace or project). Faithful port of the byronwade/ui launcher choreography.
 */
export function AppLauncher() {
  const pathname = usePathname();
  const ctx = resolveChrome(pathname);
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const morphRef = React.useRef<HTMLDivElement>(null);
  const compactRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const collapsedRef = React.useRef<{ w: number; h: number } | null>(null);
  const panelId = React.useId();

  const [slot, setSlot] = React.useState<{ w: number; h: number }>({ w: 76, h: 40 });

  // Close the panel on navigation.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useIsoLayoutEffect(() => {
    const compact = compactRef.current;
    const morph = morphRef.current;
    if (!compact || !morph) return;
    const sync = () => {
      if (morph.style.width) return;
      setSlot({ w: morph.offsetWidth, h: morph.offsetHeight });
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(compact);
    return () => ro.disconnect();
  }, []);

  useIsoLayoutEffect(() => {
    const morph = morphRef.current;
    const compact = compactRef.current;
    const panel = panelRef.current;
    if (!morph || !compact || !panel) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = "cubic-bezier(.22,1,.36,1)";
    const T = `width 220ms ${ease}, height 220ms ${ease}, border-radius 220ms ${ease}`;

    const release = () => {
      morph.style.transition = "none";
      morph.style.width = "";
      morph.style.height = "";
      void morph.offsetWidth;
      morph.style.transition = "";
    };

    if (open) {
      if (!collapsedRef.current) {
        collapsedRef.current = { w: morph.offsetWidth, h: morph.offsetHeight };
      }
      const sw = morph.offsetWidth;
      const sh = morph.offsetHeight;
      const ew = panel.offsetWidth;
      const eh = panel.offsetHeight;
      compact.style.transitionDelay = "0ms";
      compact.style.opacity = "0";
      panel.style.transitionDelay = reduce ? "0ms" : "40ms";
      panel.style.opacity = "1";
      if (reduce) {
        morph.style.transition = "none";
        morph.style.width = `${ew}px`;
        morph.style.height = `${eh}px`;
        return;
      }
      morph.style.transition = "none";
      morph.style.width = `${sw}px`;
      morph.style.height = `${sh}px`;
      void morph.offsetWidth;
      morph.style.transition = T;
      morph.style.width = `${ew}px`;
      morph.style.height = `${eh}px`;
      panel.focus({ preventScroll: true });
    } else if (collapsedRef.current && morph.style.width) {
      const { w: cw, h: ch } = collapsedRef.current;
      panel.style.transitionDelay = "0ms";
      panel.style.opacity = "0";
      compact.style.transitionDelay = reduce ? "0ms" : "80ms";
      compact.style.opacity = "1";
      if (reduce) {
        release();
        return;
      }
      morph.style.transition = T;
      morph.style.width = `${cw}px`;
      morph.style.height = `${ch}px`;
      const onEnd = (e: TransitionEvent) => {
        if (e.propertyName !== "height") return;
        release();
        morph.removeEventListener("transitionend", onEnd);
      };
      morph.addEventListener("transitionend", onEnd);
      return () => morph.removeEventListener("transitionend", onEnd);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!rootRef.current || rootRef.current.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      style={{ width: slot.w, height: slot.h, transition: "width 200ms cubic-bezier(.22,1,.36,1)" }}
      className="relative z-10 shrink-0"
    >
      <div
        ref={morphRef}
        className={cn(
          "pointer-events-auto absolute top-0 left-0 inline-flex transform-gpu overflow-hidden border border-white/5 bg-dock text-dock-foreground shadow-float [will-change:width,height]",
          open ? "rounded-2xl" : "rounded-3xl",
        )}
      >
        {/* COMPACT */}
        <div
          ref={compactRef}
          className={cn(
            "flex flex-row items-center gap-1 p-[3px] transition-opacity duration-150",
            open && "pointer-events-none",
          )}
        >
          <Link
            href="/app/overview"
            aria-label="Ciel — home"
            className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-dock-active"
          >
            <span className="grid size-6 place-items-center rounded-md bg-brand text-brand-foreground">
              <Cloud className="size-3.5" />
            </span>
          </Link>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(true)}
            title="Open navigation"
            className="flex size-8 items-center justify-center rounded-full text-dock-foreground transition-colors hover:bg-dock-active hover:text-dock-active-foreground"
          >
            <LayoutGrid className="size-4" strokeWidth={2} />
          </button>
        </div>

        {/* PANEL */}
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="Navigation"
          aria-hidden={!open}
          tabIndex={-1}
          className={cn(
            "absolute top-0 left-0 w-80 opacity-0 transition-opacity duration-150 outline-none",
            open ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          {/* Identity header */}
          <div className="flex items-center gap-3 p-3.5 pb-3">
            <span className="grid size-9 place-items-center rounded-xl bg-brand text-brand-foreground">
              <Cloud className="size-4" />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-semibold text-dock-active-foreground">{ctx.title}</div>
              <div className="text-xs font-medium text-dock-foreground">{ctx.subtitle}</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="ml-auto flex size-7 items-center justify-center rounded-lg text-dock-foreground transition-colors hover:bg-dock-active hover:text-dock-active-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Back to workspace (project context only) */}
          {ctx.kind === "project" && (
            <Link
              href="/app/projects"
              className="mx-3 mb-1.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-dock-foreground transition-colors hover:bg-dock-active hover:text-dock-active-foreground"
            >
              <ChevronLeft className="size-4" /> All projects
            </Link>
          )}

          <div className="px-3.5 pb-1.5 text-[10px] font-semibold tracking-wider text-dock-foreground/70 uppercase">
            {ctx.kind === "project" ? "Project" : "Workspace"}
          </div>
          <div className="grid max-h-[50vh] grid-cols-2 gap-1.5 overflow-y-auto px-3 pb-3 scrollbar-thin">
            {ctx.nav.map((item) => {
              const active = isNavActive(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 truncate rounded-xl px-3 py-2 text-[13px] font-medium transition-colors",
                    active
                      ? "bg-dock-active text-dock-active-foreground"
                      : "text-dock-foreground hover:bg-dock-active hover:text-dock-active-foreground",
                  )}
                >
                  <item.icon className="size-4 shrink-0" strokeWidth={2} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 border-t border-white/5 bg-black/25 p-3">
            <Link
              href="/app/settings/profile"
              onClick={() => setOpen(false)}
              className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl bg-dock-active text-[13px] font-semibold text-dock-active-foreground transition-colors hover:bg-white/15"
            >
              <User className="size-4" /> Account
            </Link>
            <Link
              href="/auth/logout"
              aria-label="Sign out"
              className="flex size-9 items-center justify-center rounded-xl text-dock-foreground transition-colors hover:bg-dock-active hover:text-dock-active-foreground"
            >
              <LogOut className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="flex size-9 items-center justify-center rounded-xl text-dock-foreground transition-colors hover:bg-dock-active hover:text-dock-active-foreground"
            >
              <Moon className="size-4 dark:hidden" />
              <Sun className="hidden size-4 dark:block" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
