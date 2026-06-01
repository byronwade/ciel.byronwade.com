"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const shortcuts = [
  { keys: "⌘K", description: "Open command palette" },
  { keys: "G then P", description: "Go to projects" },
  { keys: "G then O", description: "Go to overview" },
  { keys: "G then D", description: "Go to deployments / activity" },
  { keys: "?", description: "Show keyboard shortcuts" },
];

export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>Navigate Ciel without leaving the keyboard.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {shortcuts.map((s) => (
            <div key={s.keys} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span className="text-muted-foreground">{s.description}</span>
              <kbd className="rounded border bg-muted px-2 py-0.5 font-mono text-xs">{s.keys}</kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
