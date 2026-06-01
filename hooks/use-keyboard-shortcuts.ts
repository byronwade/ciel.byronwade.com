"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface UseKeyboardShortcutsOptions {
  projectId?: string;
  onShowHelp?: () => void;
}

export function useKeyboardShortcuts({ projectId, onShowHelp }: UseKeyboardShortcutsOptions = {}) {
  const router = useRouter();
  const pendingGo = useRef(false);
  const goTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearGo = () => {
      pendingGo.current = false;
      if (goTimer.current) clearTimeout(goTimer.current);
    };

    const armGo = () => {
      pendingGo.current = true;
      if (goTimer.current) clearTimeout(goTimer.current);
      goTimer.current = setTimeout(clearGo, 800);
    };

    const down = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        onShowHelp?.();
        return;
      }

      if (pendingGo.current) {
        if (e.key === "p") {
          e.preventDefault();
          clearGo();
          router.push("/app/projects");
          return;
        }
        if (e.key === "o") {
          e.preventDefault();
          clearGo();
          router.push(projectId ? `/app/projects/${projectId}/overview` : "/app/overview");
          return;
        }
        if (e.key === "d") {
          e.preventDefault();
          clearGo();
          router.push(projectId ? `/app/projects/${projectId}/deployments` : "/app/activity");
          return;
        }
        clearGo();
      }

      if (e.key === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        armGo();
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
      clearGo();
    };
  }, [router, projectId, onShowHelp]);
}
