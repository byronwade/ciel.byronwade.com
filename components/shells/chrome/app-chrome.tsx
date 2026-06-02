"use client";

import { AppLauncher } from "./app-launcher";
import { AppBreadcrumb } from "./app-breadcrumb";
import { DockToolbar } from "./dock-toolbar";
import { NavDock } from "./nav-dock";

/**
 * The global floating app shell. The top-left header group pins to the corner and
 * holds the morphing launcher + breadcrumb pill; the contextual toolbar pins
 * top-right; the primary nav dock floats centered (top on sm+, bottom on phones).
 * `pointer-events-none` on the header group keeps the gap from blocking content.
 */
export function AppChrome() {
  return (
    <>
      <div className="pointer-events-none fixed top-3 left-3 z-50 flex items-start gap-2 print:hidden">
        <AppLauncher />
        <AppBreadcrumb />
      </div>
      <DockToolbar />
      <NavDock />
    </>
  );
}
