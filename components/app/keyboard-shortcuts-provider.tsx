"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { KeyboardShortcutsDialog } from "@/components/app/keyboard-shortcuts-dialog";

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const projectId = typeof params.project === "string" ? params.project : undefined;
  const [helpOpen, setHelpOpen] = useState(false);

  useKeyboardShortcuts({
    projectId,
    onShowHelp: () => setHelpOpen(true),
  });

  return (
    <>
      {children}
      <KeyboardShortcutsDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </>
  );
}
