"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dialog = searchParams.get("dialog");
  const panel = searchParams.get("panel");

  const openDialog = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("dialog", id);
      params.delete("panel");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const openPanel = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("panel", id);
      params.delete("dialog");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const closeOverlay = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("dialog");
    params.delete("panel");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }, [router, pathname, searchParams]);

  return useMemo(
    () => ({ dialog, panel, openDialog, openPanel, closeOverlay, isOpen: !!(dialog || panel) }),
    [dialog, panel, openDialog, openPanel, closeOverlay]
  );
}
